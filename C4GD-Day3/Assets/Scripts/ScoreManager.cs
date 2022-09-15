using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class ScoreManager : MonoBehaviour
{
    //Variables:
    public static ScoreManager instance;
    public TextMeshProUGUI text;
    int GemScore = 0;
    
    // Start is called before the first frame update
    void Start()
    {
        if (instance == null)
        {
            instance = this;
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void ChangeScore(int GemVal)
    {
        GemScore += GemVal;
        text.text = "x" + GemScore.ToString();

    }
}
