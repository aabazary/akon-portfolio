import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/initSupabase";

const SpaceHopper = () => {
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const [gameState, setGameState] = useState(null);
  const [highScores, setHighScores] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  let gameInterval, scoreInterval;

  useEffect(() => {
    fetchHighScores();
  }, []);

  async function fetchHighScores() {
    const { data, error } = await supabase
      .from("high_scores")
      .select("name, score")
      .order("score", { ascending: false })
      .limit(5);
    if (!error) setHighScores(data || []);
  }

  async function saveScore(name, score) {
    if (!name || name.length < 1 || name.length > 16) return;
    await supabase.from("high_scores").insert([{ name, score }]);
    fetchHighScores();
  }

  function startGame() {
    setIsRunning(true);
    setIsPaused(false);
    setScore(0);
    scoreRef.current = 0;
    setShowNamePrompt(false);
    setGameState({
      player: { x: 50, y: 150, width: 30, height: 30, speed: 4 },
      obstacles: [],
      gameSpeed: gameState?.gameSpeed || 3,
      lastOrangeSpawn: 0,
    });
  }

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 300;

    let { player, obstacles, gameSpeed, lastOrangeSpawn } = gameState;
    let startTime = Date.now();

    function updateGame() {
      const elapsedTime = Date.now() - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.fillRect(player.x, player.y, player.width, player.height);

      if (Math.random() < 0.02) {
        obstacles.push({
          x: canvas.width,
          y: Math.random() * (canvas.height - 20),
          width: 20,
          height: 20,
          color: "red",
        });
      }

      if (elapsedTime - lastOrangeSpawn >= 15000) {
        gameSpeed += 0.5;
        obstacles.push({
          x: canvas.width,
          y: canvas.height - 30,
          width: 20,
          height: 20,
          color: "orange",
        });
        lastOrangeSpawn = elapsedTime;
      }

      obstacles.forEach((obstacle, index) => {
        obstacle.x -= gameSpeed;
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        if (obstacle.x + obstacle.width < 0) obstacles.splice(index, 1);
      });

      obstacles.forEach((obstacle) => {
        if (
          player.x < obstacle.x + obstacle.width &&
          player.x + player.width > obstacle.x &&
          player.y < obstacle.y + obstacle.height &&
          player.y + player.height > obstacle.y
        ) {
          clearInterval(gameInterval);
          clearInterval(scoreInterval);
          setIsRunning(false);

          const lowestHighScore = highScores[highScores.length - 1]?.score || 0;

          if (highScores.length < 5 || scoreRef.current > lowestHighScore) {
            setShowNamePrompt(true);
          }
        }
      });
    }

    function movePlayer(event) {
      if (event.key === "w") {
        player.y = Math.max(0, player.y - player.speed * 5);
      } else if (event.key === "s") {
        player.y = Math.min(
          canvas.height - player.height,
          player.y + player.speed * 5
        );
      } else if (event.key === "Escape") {
        setGameState((prev) => ({ ...prev, gameSpeed }));
        setIsPaused(!isPaused);
      }
    }

    function handleMouseMove(event) {
      const rect = canvas.getBoundingClientRect();
      player.y = event.clientY - rect.top - player.height / 2;
      player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
    }

    function handleTouchStart(event) {
      const touch = event.touches[0];
      player.startY = touch.clientY;
    }
    
    function handleTouchMove(event) {
      event.preventDefault();
      const touch = event.touches[0];
      const deltaY = touch.clientY - player.startY;
  
      player.y = Math.max(0, Math.min(canvas.height - player.height, player.y + deltaY * 0.2));
      player.startY = touch.clientY;
    }
    
    function handleTouchEnd() {
      player.startY = null;
    }
    
    window.addEventListener("keydown", movePlayer);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);

    gameInterval = setInterval(updateGame, 1000 / 60);
    scoreInterval = setInterval(() => {
      setScore((prev) => {
        scoreRef.current = prev + 1;
        return prev + 1;
      });
    }, 1000);

    return () => {
      clearInterval(gameInterval);
      clearInterval(scoreInterval);
      window.removeEventListener("keydown", movePlayer);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("touchstart", handleTouchStart);
      canvas.addEventListener("touchmove", handleTouchMove);
      canvas.addEventListener("touchend", handleTouchEnd);
    };
  }, [isRunning, isPaused, highScores]);

  return (
    <div className="flex flex-col items-center relative">
      <div className="relative w-[95vw] max-w-[600px] h-[50vw] max-h-[300px] border border-white bg-black flex items-center justify-center">
        {!isRunning && !showNamePrompt && (
          <button
            onClick={startGame}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md absolute z-40"
          >
            Start Game
          </button>
        )}
        {isPaused && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 rounded-lg z-40">
            <button
              onClick={() => setIsPaused(false)}
              className="m-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md"
            >
              Resume
            </button>
            <button
              onClick={startGame}
              className="m-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              Replay
            </button>
          </div>
        )}

        <canvas ref={canvasRef} className="absolute w-full h-full" />
      </div>
      <p className="text-white text-lg font-bold font underline mt-2">
        Score: {score}
      </p>

      {/* Bottom Section: Instructions | Empty Space | High Scores */}
      <div className="flex flex-col items-center md:flex-row justify-between w-[95vw] max-w-[600px] mt-4 text-white gap-2">
        {/* Instructions */}
        <div className="text-center w-4/5 md:w-1/3 md:text-left">
          <h2 className="text-lg font-semibold">How to Play:</h2>
          <p>🕹 Move: W/ S / Mouse</p>
          <p>⏸ Pause: Escape</p>
          <p>Avoid All Obstacles </p>
          <p>Speed increases over time </p>
          <p>Conquer the Leaderboard </p>

        </div>

        {/* High Scores Table */}
        <div className="text-center w-4/5 md:w-1/3 md:text-left">
          <h2 className="text-lg font-semibold">Leaderboard:</h2>
          <div className="border border-gray-500 rounded-md p-2">
            {highScores.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-500">
                    <th className="text-left">Name</th>
                    <th className="text-right">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {highScores.map((entry, index) => (
                    <tr key={index} className="border-t border-gray-500">
                      <td>{entry.name}</td>
                      <td className="text-right">{entry.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No high scores yet</p>
            )}
          </div>
        </div>
      </div>
      {showNamePrompt && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg text-white">
          <p>Congratulations, You made it on the Leaderboard</p>
          <p>Enter your name:</p>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="text-black p-1 rounded-md mt-2"
            maxLength={16}
          />
          {playerName.length < 1 || playerName.length > 16 ? (
            <p className="text-red-500 mt-2">
              Name must be between 1 and 16 characters.
            </p>
          ) : null}
          <button
            onClick={() => {
              if (playerName.length >= 1 && playerName.length <= 16) {
                saveScore(playerName, scoreRef.current);
                setShowNamePrompt(false);
              }
            }}
            className={`ml-2 mt-4 px-4 py-2 rounded-md ${
              playerName.length < 1 || playerName.length > 16
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
            disabled={playerName.length < 1 || playerName.length > 16}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default SpaceHopper;
