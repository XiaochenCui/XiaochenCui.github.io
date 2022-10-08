{
    init: function(elevators, floors) {
        var elevator = elevators[0]; // Let's use the first elevator

        // Whenever the elevator is idle (has no more queued destinations) ...
        elevator.on("idle", function() {
        });
        
        // Listen for the "floor_button_pressed" event, issued when a passenger
        // pressed a button inside the elevator. This indicates that the passenger
        // wants to go to that floor.
        elevator.on("floor_button_pressed", function(floorNum) {
            elevator.destinationQueue.push(floorNum);
            elevator.checkDestinationQueue();
        });
        

        for (let i = 0; i < floors.length; i++) {
            (function(index) {
                var floor = floors[index];
                // Listen for the "up_button_pressed" event, issued when a passenger
                // pressed the up button on the floor they are waiting on. This indicates
                // that the passenger wants to go to another floor.
                floors[index].on("up_button_pressed", function() {
                    elevator.destinationQueue.push(index);
                    elevator.checkDestinationQueue();
                });
            })(i);
        }   
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}