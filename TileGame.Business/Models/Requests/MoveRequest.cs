using MediatR;

namespace TileGame.Business.Models.Requests
{
    public class MoveRequest : IRequest
    {
        public string Username { get; set; }
        public string ConnectionId { get; set; }
        public Move Move { get; set; }
    }
}
