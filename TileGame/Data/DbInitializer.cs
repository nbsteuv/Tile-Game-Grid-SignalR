using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using TileGame.Business.Models;

namespace TileGame.Data
{
    public static class DbInitializer
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            var _context = applicationBuilder.ApplicationServices.GetRequiredService<ApplicationDbContext>();

            if (!_context.Words.Any())
            {
                ImportWordListFromFile(@"Data\WordLists\fiveletterlist.txt", _context, 5);

                ImportWordListFromFile(@"Data\WordLists\fourletterlist.txt", _context, 4);

                ImportWordListFromFile(@"Data\WordLists\threeletterlist.txt", _context, 3);
            }
        }

        private static void ImportWordListFromFile(string file, ApplicationDbContext _context, int letterCount)
        {
            var list = System.IO.File.ReadAllLines(file);

            foreach(var word in list)
            {
                _context.Words.Add(new Word
                {
                    LetterCount = letterCount,
                    Text = word
                });
            }

            _context.SaveChanges();
        }
    }
}
