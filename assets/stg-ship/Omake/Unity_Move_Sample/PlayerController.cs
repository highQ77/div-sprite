using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerController : MonoBehaviour
{
    public float speed = 5.0f;
    private Rigidbody2D rb2d;
    private Animator animator;
    private Vector2 moveDirection;
    private float turnTimer = 0f;
	private bool isTurningRight = false;
	private bool isTurningLeft = false;

    void Start()
    {
        rb2d = GetComponent<Rigidbody2D>();
        animator = GetComponent<Animator>();
    }

    void OnMove(InputValue value)
    {
        moveDirection = value.Get<Vector2>();
        if (moveDirection.x > 0.1)
        {
            animator.SetBool("isRight", true);
            animator.SetBool("isLeft", false);
        }
        else if (moveDirection.x < -0.1)
        {
            animator.SetBool("isRight", false);
            animator.SetBool("isLeft", true);
        }
        else
        {
            animator.SetBool("isRight", false);
            animator.SetBool("isLeft", false);
        }
    }

    void FixedUpdate()
    {
        rb2d.MovePosition(rb2d.position + moveDirection * speed * Time.deltaTime);
    }

    void Update()
    {
        if (animator.GetBool("isRight") || animator.GetBool("isLeft"))
        {
            turnTimer += Time.deltaTime;
            if (turnTimer >= 0.3f && turnTimer <= 0.6f)
            {
                if (animator.GetBool("isLeft"))
                {
					isTurningRight = true;
				}
                else if (animator.GetBool("isRight"))
                {
					isTurningLeft = true;
				}
                StartCoroutine(CheckTurn());
            }
        }
        else
        {
            turnTimer = 0;
        }

    }

    IEnumerator CheckTurn()
    {
        float startTime = Time.time;
        bool isTurning = false;
        while (Time.time - startTime < 0.2f)
        {
            if (isTurningRight && animator.GetBool("isRight") || (isTurningLeft && animator.GetBool("isLeft")))
            {
                isTurning = true;
            }
            yield return null;
        }
        if (isTurning)
        {
			if (isTurningRight)
			{
				animator.SetBool("roll_right", true);
			}
			else if (isTurningLeft)
			{
				animator.SetBool("roll_left", true);
			}
            yield return new WaitForSeconds(0.3f);
        }
		animator.SetBool("roll_right", false);
        animator.SetBool("roll_left", false);
        isTurningRight = false;
        isTurningLeft = false;
    }
}