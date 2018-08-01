var player1
var player2

class Engine
{
    static init()
    {
        const playerType = prompt()

        const canvas = document.getElementById("canvas")
        paper.setup(canvas)

        paper.view.onFrame = function(event)
        {
            if (event.count % (60/FPS) === 0)
            {
                Engine.update(event.delta)
            }
        }

        const background  = new paper.Path.Rectangle({
            point: [0, 0],
            size: [800,800],
            strokeColor: '#333',
            fillColor: '#111'
        })
        background.sendToBack()
        
        if (playerType == "1")
        {
            player1 = new Worm(400, 400, 0, '#00A1CA', true)
            player2 = new Worm(400, 400, 180, '#E93844', false)
        }
        else
        {
            player2 = new Worm(400, 400, 0, '#00A1CA', false)
            player1 = new Worm(400, 400, 180, '#E93844', true)
        }

        Network.init()
    }

    static processInput(direction, pressed)
    {
        if (player1)
        {
            player1.processLocalInput(direction, pressed)
        }
    }

    static processMessage(data)
    {
        player2.processRemoteInput(data)
    }

    static update(delta)
    {
        player1.move(delta)
        player2.move(delta)
    }
}