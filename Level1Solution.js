if(memory.initialized === undefined)
{
	//Initialization goes here
	//e.g. memory.state = 1;
	memory.lastColour = "White";
	memory.state = 0;
	memory.desiredDirection = 0;
	
	memory.initialized = "Yes";
}

if (inputs.ProxSensor === "On")
{
    if(inputs.ColorSensor === "Red")
    {
    	if(memory.lastColour != "Red")
    	{
    	    memory.desiredDirection = (90 + memory.desiredDirection) % 360;
    	}
    }
    else if (inputs.ColorSensor === "Black")
    {
    	if(memory.lastColour != "Black")
    	{
    	    memory.desiredDirection = (memory.desiredDirection + 270) % 360;
    	}
    }
    memory.lastColour = inputs.ColorSensor;
    memory.state = 0;
}

var missMagnitude = Math.abs(Math.sin(memory.desiredDirection/180 * Math.PI) - Math.sin(inputs.Compass/180 * Math.PI));
var direction = Math.sin((memory.desiredDirection - inputs.Compass)/180 * Math.PI);
if(missMagnitude  < 0.1)
{
    if(memory.state === 0)
    {
    	memory.lastColour = inputs.ColorSensor;
    	memory.state = 1;
    }
	
    if(direction < 0)
    {
    	console.log("Too far left");
    	outputs.LeftMotor = 5 + missMagnitude * 20;
    	outputs.RightMotor = 5 - missMagnitude * 20;
    }
    else
    {
    	console.log("Too far Right");
    	outputs.LeftMotor = 5 - missMagnitude * 20;
    	outputs.RightMotor = 5 + missMagnitude * 20;
    }
	
} 
else
{
    if(direction < 0)
    {
    	outputs.LeftMotor = missMagnitude*10 + 0.2;
    	outputs.RightMotor = -missMagnitude*10 - 0.2;
    }
    else
    {
    	outputs.LeftMotor = -missMagnitude*10 - 0.2;
    	outputs.RightMotor = missMagnitude*10 + 0.2;
    }
}


		
			