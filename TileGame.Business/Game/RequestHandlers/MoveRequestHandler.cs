using MediatR;
using Serilog;
using System;
using TileGame.Business.Models.Requests;

namespace TileGame.Business.Game.RequestHandlers
{
    public class MoveRequestHandler : RequestHandler<MoveRequest>
    {
        private readonly IGameManager _gameManager;

        public MoveRequestHandler(IGameManager gameManager)
        {
            _gameManager = gameManager;
        }

        protected override void HandleCore(MoveRequest request)
        {
            try
            {
                _gameManager.Move(request.Username, request.ConnectionId, request.Move);
            }
            catch (Exception e)
            {
                Log.Error(e, e.Message);
            }
        }
    }
}
