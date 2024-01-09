document.addEventListener("DOMContentLoaded", function () {
    const puzzleContainer = document.getElementById("puzzle-container");
    const puzzlePieces = [];

    // Create the puzzle pieces
    for (let i = 1; i <= 8; i++) {
        const piece = document.createElement("div");
        piece.className = "puzzle-piece";
        piece.textContent = i;
        piece.addEventListener("click", () => handlePieceClick(i));
        puzzlePieces.push(piece);
        puzzleContainer.appendChild(piece);
    }

    // Add the empty piece
    const emptyPiece = document.createElement("div");
    emptyPiece.className = "puzzle-piece empty";
    puzzlePieces.push(emptyPiece);
    puzzleContainer.appendChild(emptyPiece);

    // Shuffle the puzzle pieces
    shufflePuzzle();

    function handlePieceClick(pieceNumber) {
        const emptyIndex = puzzlePieces.findIndex(piece => piece.classList.contains("empty"));
        const currentIndex = puzzlePieces.findIndex(piece => parseInt(piece.textContent) === pieceNumber);

        if (isAdjacent(currentIndex, emptyIndex)) {
            // Swap the positions of the clicked piece and the empty piece
            const temp = puzzlePieces[currentIndex];
            puzzlePieces[currentIndex] = puzzlePieces[emptyIndex];
            puzzlePieces[emptyIndex] = temp;

            // Update the puzzle layout
            updatePuzzle();
        }
    }

    function isAdjacent(index1, index2) {
        const row1 = Math.floor(index1 / 3);
        const col1 = index1 % 3;
        const row2 = Math.floor(index2 / 3);
        const col2 = index2 % 3;

        return (Math.abs(row1 - row2) === 1 && col1 === col2) || (Math.abs(col1 - col2) === 1 && row1 === row2);
    }

    function updatePuzzle() {
        puzzleContainer.innerHTML = "";
        puzzlePieces.forEach(piece => puzzleContainer.appendChild(piece));
    }

    function shufflePuzzle() {
        for (let i = puzzlePieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = puzzlePieces[i];
            puzzlePieces[i] = puzzlePieces[j];
            puzzlePieces[j] = temp;
        }

        updatePuzzle();
    }
});
