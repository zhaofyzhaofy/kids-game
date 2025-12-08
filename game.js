// 儿童贪吃蛇游戏核心逻辑
class GameState {
    constructor() {
        this.gridSize = 15;
        this.cellSize = 30;
        this.snake = [];
        this.food = {};
        this.direction = 'right';
        this.nextDirection = 'right';
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('snakeHighScore')) || 0;
        this.isPlaying = false;
        this.speedLevel = 'medium';
        this.gameHistory = JSON.parse(localStorage.getItem('snakeGameHistory')) || [];
        this.gameInterval = null;
        
        this.speedLevels = {
            slow: 300,
            medium: 200,
            fast: 100
        };
        
        this.colors = {
            snake: '#4CAF50',
            food: '#FF5252',
            background: '#F8F9FA',
            grid: '#E0E0E0'
        };
        
        this.init();
    }

    init() {
        this.resetGame();
        this.loadHistory();
        this.updateUI();
    }

    resetGame() {
        this.snake = [];
        this.direction = 'right';
        this.nextDirection = 'right';
        this.score = 0;
        this.isPlaying = false;
        
        // 初始化蛇身
        const startX = Math.floor(this.gridSize / 2);
        const startY = Math.floor(this.gridSize / 2);
        
        for (let i = 0; i < 3; i++) {
            this.snake.push({ x: startX - i, y: startY });
        }
        
        this.generateFood();
        this.clearGameInterval();
        this.updateUI();
    }

    generateFood() {
        let food;
        let isOnSnake;
        
        do {
            isOnSnake = false;
            food = {
                x: Math.floor(Math.random() * this.gridSize),
                y: Math.floor(Math.random() * this.gridSize)
            };
            
            // 检查食物是否在蛇身上
            for (const segment of this.snake) {
                if (segment.x === food.x && segment.y === food.y) {
                    isOnSnake = true;
                    break;
                }
            }
        } while (isOnSnake);
        
        this.food = food;
    }

    moveSnake() {
        if (!this.isPlaying) return;

        // 更新方向
        this.direction = this.nextDirection;

        // 计算新的头部位置
        const head = { ...this.snake[0] };
        
        switch (this.direction) {
            case 'up':
                head.y = (head.y - 1 + this.gridSize) % this.gridSize;
                break;
            case 'down':
                head.y = (head.y + 1) % this.gridSize;
                break;
            case 'left':
                head.x = (head.x - 1 + this.gridSize) % this.gridSize;
                break;
            case 'right':
                head.x = (head.x + 1) % this.gridSize;
                break;
        }

        // 检查是否吃到食物
        const ateFood = head.x === this.food.x && head.y === this.food.y;

        if (ateFood) {
            this.score += 10;
            this.generateFood();
            this.playEatAnimation();
        } else {
            // 没吃到食物，移除尾部
            this.snake.pop();
        }

        // 添加新的头部
        this.snake.unshift(head);

        // 更新最高分
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHighScore', this.highScore.toString());
        }

        this.updateUI();
    }

    changeDirection(newDirection) {
        // 防止180度转向
        const oppositeDirections = {
            'up': 'down',
            'down': 'up',
            'left': 'right',
            'right': 'left'
        };
        
        if (newDirection !== oppositeDirections[this.direction]) {
            this.nextDirection = newDirection;
        }
    }

    changeSpeed(level) {
        this.speedLevel = level;
        this.clearGameInterval();
        
        if (this.isPlaying) {
            this.startGame();
        }
        
        this.updateSpeedButtons();
    }

    startGame() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.clearGameInterval();
        
        this.gameInterval = setInterval(() => {
            this.moveSnake();
        }, this.speedLevels[this.speedLevel]);
        
        this.updateUI();
    }

    pauseGame() {
        this.isPlaying = false;
        this.clearGameInterval();
        this.updateUI();
    }

    clearGameInterval() {
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
    }

    gameOver() {
        this.isPlaying = false;
        this.clearGameInterval();
        this.saveGameHistory();
        this.updateUI();
    }

    saveGameHistory() {
        const gameRecord = {
            score: this.score,
            date: new Date().toLocaleString(),
            speed: this.speedLevel
        };
        
        this.gameHistory.unshift(gameRecord);
        
        // 只保留最近10条记录
        if (this.gameHistory.length > 10) {
            this.gameHistory = this.gameHistory.slice(0, 10);
        }
        
        localStorage.setItem('snakeGameHistory', JSON.stringify(this.gameHistory));
        this.updateHistoryDisplay();
    }

    loadHistory() {
        this.updateHistoryDisplay();
    }

    updateUI() {
        // 更新分数显示
        document.getElementById('score').textContent = this.score;
        document.getElementById('highScore').textContent = this.highScore;
        
        // 更新按钮状态
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        
        if (this.isPlaying) {
            startBtn.disabled = true;
            pauseBtn.disabled = false;
        } else {
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }
        
        // 更新音效按钮状态
        const soundBtn = document.getElementById('soundBtn');
        if (soundBtn) {
            soundBtn.textContent = soundManager.enabled ? '🔊 音效开' : '🔇 音效关';
        }
    }

    updateSpeedButtons() {
        const speedBtns = document.querySelectorAll('.speed-btn');
        speedBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.speed === this.speedLevel) {
                btn.classList.add('active');
            }
        });
    }

    updateHistoryDisplay() {
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = '';
        
        this.gameHistory.forEach((record, index) => {
            const prevRecord = this.gameHistory[index + 1];
            let statusClass = '';
            let statusIcon = '';
            
            if (prevRecord) {
                if (record.score > prevRecord.score) {
                    statusClass = 'improved';
                    statusIcon = '📈 ';
                } else if (record.score < prevRecord.score) {
                    statusClass = 'declined';
                    statusIcon = '📉 ';
                }
            }
            
            const historyItem = document.createElement('div');
            historyItem.className = `history-item ${statusClass}`;
            historyItem.innerHTML = `
                ${statusIcon}得分: ${record.score} 
                <small>(${record.date}, ${record.speed}速)</small>
            `;
            
            historyList.appendChild(historyItem);
        });
    }

    playEatAnimation() {
        const foodElement = document.querySelector('.food-animation');
        if (foodElement) {
            foodElement.classList.add('bounce');
            setTimeout(() => {
                foodElement.classList.remove('bounce');
            }, 600);
        }
        soundManager.playSound('eat');
    }
}

// 渲染器类
class Renderer {
    constructor(gameState) {
        this.gameState = gameState;
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.initCanvas();
    }

    initCanvas() {
        this.canvas.width = this.gameState.gridSize * this.gameState.cellSize;
        this.canvas.height = this.gameState.gridSize * this.gameState.cellSize;
    }

    drawGrid() {
        this.ctx.strokeStyle = this.gameState.colors.grid;
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i <= this.gameState.gridSize; i++) {
            // 画横线
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gameState.cellSize);
            this.ctx.lineTo(this.canvas.width, i * this.gameState.cellSize);
            this.ctx.stroke();
            
            // 画竖线
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gameState.cellSize, 0);
            this.ctx.lineTo(i * this.gameState.cellSize, this.canvas.height);
            this.ctx.stroke();
        }
    }

    drawSnake() {
        this.gameState.snake.forEach((segment, index) => {
            this.ctx.fillStyle = this.gameState.colors.snake;
            if (index === 0) {
                // 蛇头
                this.ctx.fillStyle = '#2E7D32';
            }
            
            this.ctx.fillRect(
                segment.x * this.gameState.cellSize,
                segment.y * this.gameState.cellSize,
                this.gameState.cellSize,
                this.gameState.cellSize
            );
            
            // 蛇身圆角
            this.ctx.strokeStyle = '#1B5E20';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(
                segment.x * this.gameState.cellSize + 2,
                segment.y * this.gameState.cellSize + 2,
                this.gameState.cellSize - 4,
                this.gameState.cellSize - 4
            );
        });
    }

    drawFood() {
        this.ctx.fillStyle = this.gameState.colors.food;
        this.ctx.beginPath();
        this.ctx.arc(
            (this.gameState.food.x + 0.5) * this.gameState.cellSize,
            (this.gameState.food.y + 0.5) * this.gameState.cellSize,
            this.gameState.cellSize * 0.4,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
        
        // 食物高光
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(
            (this.gameState.food.x + 0.3) * this.gameState.cellSize,
            (this.gameState.food.y + 0.3) * this.gameState.cellSize,
            this.gameState.cellSize * 0.1,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
    }

    render() {
        // 清空画布
        this.ctx.fillStyle = this.gameState.colors.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawGrid();
        this.drawSnake();
        this.drawFood();
    }
}

// 游戏初始化
let gameState;
let renderer;
let soundManager;

function initGame() {
    gameState = new GameState();
    renderer = new Renderer(gameState);
    soundManager = new SoundManager();
    
    // 绑定事件
    bindEvents();
    
    // 初始渲染
    renderer.render();
    gameLoop();
}

function bindEvents() {
    // 方向按钮
    document.getElementById('upBtn').addEventListener('click', () => {
        gameState.changeDirection('up');
    });
    
    document.getElementById('downBtn').addEventListener('click', () => {
        gameState.changeDirection('down');
    });
    
    document.getElementById('leftBtn').addEventListener('click', () => {
        gameState.changeDirection('left');
    });
    
    document.getElementById('rightBtn').addEventListener('click', () => {
        gameState.changeDirection('right');
    });
    
    // 动作按钮
    document.getElementById('startBtn').addEventListener('click', () => {
        gameState.startGame();
    });
    
    document.getElementById('pauseBtn').addEventListener('click', () => {
        gameState.pauseGame();
    });
    
    document.getElementById('resetBtn').addEventListener('click', () => {
        gameState.resetGame();
        renderer.render();
    });
    
    // 速度按钮
    document.querySelectorAll('.speed-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            gameState.changeSpeed(btn.dataset.speed);
        });
    });
    
    // 触摸事件
    const controlBtns = document.querySelectorAll('.control-btn');
    controlBtns.forEach(btn => {
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            btn.click();
        });
    });
    
    // 音效控制按钮
    const soundBtn = document.createElement('button');
    soundBtn.className = 'action-btn';
    soundBtn.id = 'soundBtn';
    soundBtn.textContent = soundManager.enabled ? '🔊 音效开' : '🔇 音效关';
    soundBtn.addEventListener('click', () => {
        const enabled = soundManager.toggleSound();
        soundBtn.textContent = enabled ? '🔊 音效开' : '🔇 音效关';
        soundManager.playSound('click');
    });
    
    document.querySelector('.action-controls').appendChild(soundBtn);
}

function gameLoop() {
    requestAnimationFrame(gameLoop);
    renderer.render();
}

// 启动游戏
document.addEventListener('DOMContentLoaded', initGame);