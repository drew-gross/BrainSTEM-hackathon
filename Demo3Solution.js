if(memory.initialized === undefined)
{
	//Initialization goes here
	//e.g. memory.state = 1;
	
	memory.initialized = "Yes";
}

if(inputs.ProxSensor === "On")
{
    outputs.RightMotor = 2.0;
    outputs.LeftMotor = -2.0;
}
else
{
    outputs.RightMotor = 5.0;
    outputs.LeftMotor = 5.0;
}

