var speed = 0.4;
if(inputs.ProxSensor0 == "On" && inputs.ProxSensor1 == "On")
{
    outputs.LeftMotor = 3 * speed;
    outputs.RightMotor = -3 * speed;
}
else if(inputs.ProxSensor0 == "Off" && inputs.ProxSensor1 == "On")
{
    outputs.LeftMotor = 3 * speed;
    outputs.RightMotor = -3 * speed;
}
else if(inputs.ProxSensor0 == "On" && inputs.ProxSensor1 == "Off")
{
    outputs.LeftMotor = 6 * speed;
    outputs.RightMotor = 6 * speed;
}
else if(inputs.ProxSensor0 == "Off" && inputs.ProxSensor1 == "Off")
{
    outputs.LeftMotor = -3 * speed;
    outputs.RightMotor = 3 * speed;
}