using MediatR;
using Serilog;
using System;
using TileGame.Business.Models.Requests;

namespace TileGame.Business.Game.RequestHandlers
{
    public class DisconnectRequestHandler : RequestHandler<DisconnectRequest>
    {
        private readonly IGameManager _gameManager;

        public DisconnectRequestHandler(IGameManager gameManager)
        {
            _gameManager = gameManager;
        }

        protected override void HandleCore(DisconnectRequest request)
        {
            try
            {
                _gameManager.Disconnect(request.ConnectionId);
            }
            catch (Exception e)
            {
                Log.Error(e, e.Message);
            }
        }
    }
}
