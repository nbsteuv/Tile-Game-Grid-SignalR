﻿using TileGame.Business.Models;

namespace TileGame.Business.Game
{
    public interface IGameManager
    {
        Connection MakeConnection(string username, string connectionId, string password);
        Enums.ConnectionStatus GetConnectionStatus (string connectionId, Connection connection);
    }
}
