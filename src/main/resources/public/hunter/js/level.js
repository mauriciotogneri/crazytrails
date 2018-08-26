class Level
{
    constructor()
    {
        for (var i = 0; i < 10; i++)
        {
            new Wall(0, i * 50, 50, 50)
        }

        for (var i = 0; i < 7; i++)
        {
            new Wall(150, (i * 50) + 150, 50, 50)
        }

        for (var i = 0; i < 10; i++)
        {
            new Wall(300, i * 50, 50, 50)
        }

        for (var i = 0; i < 6; i++)
        {
            new Wall(i * 50, 0, 50, 50)
        }
    }
}