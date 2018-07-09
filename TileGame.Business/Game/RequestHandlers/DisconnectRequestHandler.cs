using MediatR;
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
            _gameManager.Disconnect(request.ConnectionId);
        }
    }
}
