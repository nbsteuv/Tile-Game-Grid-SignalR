﻿using TileGame.Business.Game.HubContext;
using TileGame.Business.Game.MoveHandlers;
using TileGame.Business.Models;

namespace TileGame.Business.Game
{
    public class MoveHandlerFactory : IMoveHandlerFactory
    {
        public IMoveHandler CreateMoveHandler(Connection connection, User user, IGameHubContext gameHubContext)
        {
            IMoveHandler moveHandler;

            moveHandler = new SingleGameMoveHandler(connection, user, gameHubContext);

            return moveHandler;
        }
    }
}
