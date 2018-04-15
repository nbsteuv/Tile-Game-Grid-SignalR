using Microsoft.EntityFrameworkCore;
using TileGame.Business.Models;

namespace TileGame.Business.Data
{
    public interface IApplicationDbContext
    {
        DbSet<Word> Words { get; set; }
    }
}
