using MediatR;
using static TileGame.Business.Enums;

namespace TileGame.Business.Models.Requests
{
    public class MakeConnectionRequest : IRequest
    {
        public GameType GameType { get; set; }
        public string Username { get; set; }
        public string ConnectionId { get; set; }
        public string Password { get; set; }
        public int WordLength { get; set; }
    }
}
