class BroadphaseCollisionDetector {

    constructor(entities) {
        this.entities = Array.isArray(entities) ? entities : [];
    }

    sweepAndPrune() {
        var gridWidth = Math.floor((this.height) / this.cellSize);
        var gridHeight = Math.floor((this.width) / this.cellSize);
        var left;
        var right;
        var top;
        var bottom;
        var i;
        var j;
        var entity;
        var cX;
        var cY;
        var gridCol;
        var gridCell;
        var size;
        var position;

        // the total number of cells this grid will contain
        this.totalCells = gridWidth * gridHeight;

        // construct grid
        // NOTE: this is a purposeful use of the Array() constructor
        this.grid = Array(gridWidth);

        // insert all entities into grid
        for (i = 0; i < this.entities.length; i++) {
            entity = this.entities[i];
            size = entity.properties["size"][0];
            position = entity.properties["position"][0];

            // if entity is outside the grid extents, then ignore it
            if (
                position.x < this.x || position.x + size.width > this.x + this.width ||
                position.y < this.y || position.y + size.height > this.y + this.height
            ) {
                continue;
            }

            // Find the cells that the entity overlap.
            left = Math.floor((position.x - this.x) / this.cellSize);
            right = Math.floor((position.x + size.width - this.x) / this.cellSize);
            top = Math.floor((position.y - this.y) / this.cellSize);
            bottom = Math.floor((position.y + size.height - this.y) / this.cellSize);

            // Insert entity into each cell it overlaps
            for (cX = left; cX <= right; cX++) {

                // Make sure a column exists, initialize if not to grid height length
                // NOTE: again, a purposeful use of the Array constructor
                if (!this.grid[cX]) {
                    this.grid[cX] = Array(gridHeight);
                }

                gridCol = this.grid[cX];

                // Loop through each cell in this column
                for (cY = top; cY <= bottom; cY++) {

                    // Ensure we have a bucket to put entities into for this cell
                    if (!gridCol[cY]) {
                        gridCol[cY] = [];
                    }

                    gridCell = gridCol[cY];

                    // Add entity to cell
                    gridCell.push(entity);
                }
            }
        }
    }

    queryForCollisions() {

    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    removeEntity(entity) {
        var index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }

}

module.exports = BroadphaseCollisionDetector;
