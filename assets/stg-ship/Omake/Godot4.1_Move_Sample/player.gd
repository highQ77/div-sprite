extends CharacterBody2D

@export var speed = 200
@export var is_right := false
@export var is_left := false
@export var roll_right := false
@export var roll_left := false

var isTurningRight = false
var turnTimer = 0
var startTime = 0

func get_input():
	var input_direction = Input.get_vector("left", "right", "up", "down")
	velocity = input_direction * speed

func _physics_process(delta):
	get_input()
	move_and_slide()

	is_right = velocity.x > 0.1
	is_left = velocity.x < -0.1

	if is_right or is_left:
		turnTimer += delta
		if turnTimer >= 0.3 and turnTimer <= 0.6:
			if is_left:
				isTurningRight = true
			CheckTurn()
	else:
		turnTimer = 0

func CheckTurn():
	startTime = Time.get_ticks_msec()
	var isTurning = false
	while Time.get_ticks_msec() - startTime < 200:
		if (isTurningRight and is_right) or (not isTurningRight and is_left):
			isTurning = true
		await get_tree().process_frame
	if isTurning:
		if isTurningRight:
			roll_right = true
		else:
			roll_left = true
		await get_tree().create_timer(0.3).timeout
	roll_right = false
	roll_left = false
	isTurningRight = false
