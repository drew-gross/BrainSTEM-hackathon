if(memory.initialized === undefined)
{
	//Initialization goes here
	//e.g. memory.state = 1;
	memory.state = 1;
	memory.desiredDirection = 0;

	memory.initialized = "Yes";
}

if(inputs.ColorSensor === "Black")
{
	if(memory.state === 1)
	{
		memory.desiredDirection = (90 + memory.desiredDirection) % 360;
		memory.state = 0;
	}
}
else if (inputs.ColorSensor === "Red")
{
	if(memory.state === 1)
	{
		memory.desiredDirection = (memory.desiredDirection + 270) % 360;
		memory.state = 0;
	}
}

var missMagnitude = Math.abs(Math.sin(memory.desiredDirection/180 * Math.PI) - Math.sin(inputs.Compass/180 * Math.PI));
var direction = Math.sin((memory.desiredDirection - inputs.Compass)/180 * Math.PI);
if(missMagnitude  < 0.1)
{
	memory.state = 1;
	
	if(direction < 0)
	{
		outputs.LeftMotor = 5 + missMagnitude * 20;
		outputs.RightMotor = 5 - missMagnitude * 20;
	}
	else
	{
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