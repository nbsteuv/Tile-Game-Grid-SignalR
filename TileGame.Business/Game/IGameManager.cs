﻿using System.Collections.Generic;
using System.Threading.Tasks;
using TileGame.Business.Models;
using static TileGame.Business.Enums;

namespace TileGame.Business.Game
{
    public interface IGameManager
    {
        Task MakeConnectionAsync(string username, string connectionId, string password, GameType gameType, int wordLength);
        void Move(Move move, string username, string connectionId);
    }
}
