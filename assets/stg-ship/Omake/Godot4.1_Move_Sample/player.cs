using Godot;
using System;

public partial class player : CharacterBody2D
{
	[Export]
	public int Speed = 200;
	public bool is_right = false;
	public bool is_left = false;
	public bool roll_right = false;
	public bool roll_left = false;

	private bool isTurningRight = false;
	private double turnTimer = 0f;
	private double startTime = 0f;

    public void GetInput()
    {
        Vector2 inputDirection = Input.GetVector("left", "right", "up", "down");
        Velocity = inputDirection * Speed;
    }

	public override void _PhysicsProcess(double delta)
	{
        GetInput();
		MoveAndSlide();

		is_right = Velocity.X > 0.1;
		is_left = Velocity.X < -0.1;

		if (is_right || is_left)
		{
			turnTimer += delta;
			if (turnTimer >= 0.3f && turnTimer <= 0.6f)
			{
				if (is_left)
				{
					isTurningRight = true;
				}
				CheckTurn();
			}
		}
		else
		{
			turnTimer = 0;
		}
	}

	private async void CheckTurn()
	{
		startTime = Time.GetTicksMsec();
		var isTurning = false;
		while (Time.GetTicksMsec() - startTime < 200)
		{
			if ((isTurningRight && is_right) || (!isTurningRight && is_left))
			{
				isTurning = true;
			}
			await ToSignal(GetTree(), "process_frame");
		}
		if (isTurning)
		{
			if (isTurningRight)
			{
				roll_right = true;
			}
			else
			{
				roll_left = true;
			}
			await ToSignal(GetTree().CreateTimer(0.3f), "timeout");
		}
		roll_right = false;
		roll_left = false;
		isTurningRight = false;
	}
}
