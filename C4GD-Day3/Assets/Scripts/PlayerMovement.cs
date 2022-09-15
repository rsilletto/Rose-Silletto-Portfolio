using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    //Variables

    public float speed = 5f;
    private float movementInput;
    private Rigidbody2D rb;
    public float jumpForce = 5f;
    private bool facingRight = true;
    public bool isGrounded = false;
    public Animator animator;

    // Start is called before the first frame update
    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    //FixedUpdate is used with physics engine for standard frame rate
    void FixedUpdate()
    {
        //Move a character
        movementInput = Input.GetAxis("Horizontal");

        //Player's RigidBody uses velocity
        //Debug.Log(movementInput);
        rb.velocity = new Vector2(movementInput * speed, rb.velocity.y);

        //Calling Jump method
        Jump();

        //Flipping Player's sprite
        if (facingRight == false && movementInput > 0)
            Flip();
        else if (facingRight == true && movementInput < 0)
            Flip();

        //Running Animation
        animator.SetFloat("Speed", Mathf.Abs(movementInput));

        //Jumping Animation
        if (isGrounded == true)
            animator.SetBool("IsJumping", false);
      
        //transform.rotation = Quaternion.Euler(transform.rotation.x, transform.rotation.y, 0);

    }

    void Jump()
    {
        //Player's Jump

        if (Input.GetButtonDown("Jump") && isGrounded == true)
        { 
            rb.AddForce(new Vector2(0f, jumpForce), ForceMode2D.Impulse); // sets force of jump
            isGrounded = false; // Player is in the air when jumping
            animator.SetBool("IsJumping", true); // initiates Player's jump animation
        }
    }

    void Flip() // flips Player sprite based on direction of movement
    {
        facingRight = !facingRight;
        transform.Rotate(0f, 180f, 0f);
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.CompareTag("Gem")) // destroys Gem on contact with Player
        {
            Destroy(collision.gameObject);
        }

        if (collision.gameObject.CompareTag("Death")) // moves Player back to start on death
        {
            rb.transform.position = new Vector2(-5.43f, -2.16f);
        }

        /*
        if (collision.gameObject.CompareTag("Player"))
        {
            isGrounded = true;
        } */
    }

    /*
    private void OnTriggerExit2D(Collider2D collision)
    {
        if (collision.gameObject.CompareTag("Player"))
        {
            isGrounded = false;
        }
    } */
        
}
