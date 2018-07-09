using MediatR;

namespace TileGame.Business.Models.Requests
{
    public class DisconnectRequest : IRequest
    {
        public string ConnectionId;
    }
}
