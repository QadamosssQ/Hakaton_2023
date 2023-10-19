    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const cellSize = 20;

    const rows = Math.floor(canvas.height / cellSize);
    const cols = Math.floor(canvas.width / cellSize);

    const maze = Array(rows).fill(null).map(() => Array(cols).fill(0));

    let startRow, startCol, endRow, endCol;

    export function generateMaze() {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          maze[row][col] = 1;
        }
      }

      function recursiveBacktracking(row, col) {
        maze[row][col] = 0;

        const directions = [
          [-2, 0],
          [2, 0],
          [0, -2],
          [0, 2],
        ];

        shuffleArray(directions);

        for (const [dRow, dCol] of directions) {
          const newRow = row + dRow;
          const newCol = col + dCol;

          if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && maze[newRow][newCol] === 1) {
            const wallRow = row + dRow / 2;
            const wallCol = col + dCol / 2;
            maze[wallRow][wallCol] = 0;
            recursiveBacktracking(newRow, newCol);
          }
        }
      }

      startRow = 1;
      startCol = 1;
      endRow = rows - 2;
      endCol = cols - 2;

      recursiveBacktracking(1, 1);
    }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    export function drawMaze() {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (row === startRow && col === startCol) {
            ctx.fillStyle = 'green';
          } else if (row === endRow && col === endCol) {
            ctx.fillStyle = 'red';
          } else if (maze[row][col] === 1) {
            ctx.fillStyle = 'white';
          } else {
            continue;
          }

          ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
      }
    }

    generateMaze();
    drawMaze();