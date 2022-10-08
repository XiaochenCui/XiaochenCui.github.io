{
    init: function(elevators, floors) {
        for (let i = 0; i < elevators.length; i++) {
            (function (index) {
                var elevator = elevators[index];

                // Whenever the elevator is idle (has no more queued destinations) ...
                elevator.on("idle", function () {
                });

                // Listen for the "floor_button_pressed" event, issued when a passenger
                // pressed a button inside the elevator. This indicates that the passenger
                // wants to go to that floor.
                elevator.on("floor_button_pressed", function (floorNum) {
                    var vectorDirection = "up";
                    if (elevator.currentFloor() > floorNum) {
                        vectorDirection = "down";
                    }
                    autoInsert(elevator, floorNum, vectorDirection);
                });

                // Triggered slightly before the elevator will pass a floor. A good
                // time to decide whether to stop at that floor. Note that this event
                // is not triggered for the destination floor. Direction is either
                // "up" or "down".
                elevator.on("passing_floor", function (floorNum, direction) {

                });
            })(i);
        }


        for (let i = 0; i < floors.length; i++) {
            (function (index) {
                var floor = floors[index];
                // Listen for the "up_button_pressed" event, issued when a passenger
                // pressed the up button on the floor they are waiting on. This indicates
                // that the passenger wants to go to another floor.
                floor.on("up_button_pressed", function () {
                    var elevator = getClosestElevator();
                    console.log("the passenger [press up] at: " + floor.floorNum());
                    console.log("elevator current at: " + elevator.currentFloor() + ", queue: " + elevator.destinationQueue);
                    autoInsert(elevator, floor.floorNum(), "up");
                });

                floor.on("down_button_pressed", function () {
                    var elevator = getClosestElevator();
                    console.log("the passenger [press down] at: " + floor.floorNum());
                    console.log("elevator current at: " + elevator.currentFloor() + ", queue: " + elevator.destinationQueue);
                    autoInsert(elevator, floor.floorNum(), "down");
                });
            })(i);
        }

        // Given the fact that:
        // 1. The elevator has a fixed capacity.
        // 2. Each event can be represented as a vector.
        //  - When a passenger press the button in the elevator, it's a vector from the current position to the destination floor.
        //  - when a passenger press the up/down button on a floor, it's a vector start from the floor and target to the given direction. We cannot know the destination floor before he enter the elevator, so we just assume the destination floor is one floor away from the start floor.
        // 
        // We can transform the "destinationQueue" of the elevator into a vector cupboard, and insert the new vector into the cupboard.
        // 
        // And transform the vector cupboard back to the "destinationQueue" after insertion is done.
        function insertVector(elevator, start, end) {
        }

        // arguments:
        // - target: the floor number to go to
        // - targetDirection: the direction of the passenger's movement,
        //  either "up" or "down"
        function autoInsert(elevator, target, targetDirection) {
            if (elevator.loadFactor() == 1) {
                return;
            }

            if (elevator.length == 0) {
                insertToQueue(elevator, -1, target);
                return;
            }

            if (elevator.currentFloor() == target) {
                elevator.goToFloor(target, true);
                return;
            }

            var direction = elevator.destinationDirection();
            if (direction == "up") {
                if (target > elevator.currentFloor() && target < elevator.destinationQueue[0]) {
                    insertToQueue(elevator, 0, target);
                }
            } else if (direction == "down") {
                if (target < elevator.currentFloor() && target > elevator.destinationQueue[0]) {
                    insertToQueue(elevator, 0, target);
                }
            }

            const curve = [elevator.currentFloor()];
            curve = curve.concat(elevator.destinationQueue);

            for (let i = 0; i < curve.length - 1; i++) {
                if (targetDirection == "up") {
                    if (target > curve[i] && target < curve[i + 1]) {
                        insertToQueue(elevator, i, target);
                        return;
                    }
                }

                if (targetDirection == "down") {
                    if (target < curve[i] && target > curve[i + 1]) {
                        insertToQueue(elevator, i, target);
                        return;
                    }
                }
            }

            insertToQueue(elevator, -1, target);
        }

        // insert to the desired position of the target elevator's destination
        // queue, position of -1 means "push_back"
        function insertToQueue(elevator, position, element) {
            console.log("insert start, pos: " + position + ", element: " + element + ", destination queue: " + elevator.destinationQueue);
            if (position < 0) {
                pushBack(elevator, element);
            } else {
                elevator.destinationQueue.splice(position, 0, element);
            }
            console.log("insert end, destination queue: " + elevator.destinationQueue);
            elevator.checkDestinationQueue();
        }

        function pushBack(elevator, element) {
            var destinationQueue = elevator.destinationQueue;
            if (destinationQueue.length == 0) {
                destinationQueue.push(element);
            } else {
                var lastEle = destinationQueue[destinationQueue.length - 1];
                // only push when the numbers not repeat
                if (lastEle != element) {
                    destinationQueue.push(element);
                }
            }
        }

        function getClosestElevator() {
            var maxTask = floors.length * 2;
            var slacker = 0;
            for (let i = 0; i < elevators.length; i++) {
                var current = elevators[i].destinationQueue;
                if (current < maxTask) {
                    maxTask = current;
                    slacker = i;
                }
            }
            return elevators[slacker];
        }
    },

    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}