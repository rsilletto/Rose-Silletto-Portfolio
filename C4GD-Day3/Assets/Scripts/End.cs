using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using TMPro;

public class End : MonoBehaviour
{
    public TextMeshProUGUI instance;
    public TextMeshProUGUI text;

    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.CompareTag("Player"))
        {
            text.text = "You finished the level!";
        }
    }

}
