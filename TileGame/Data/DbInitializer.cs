using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
                _context.Words.Add(new Word
                {
                    LetterCount = 4,
                    Text = "Blue"
                });

                _context.SaveChanges();
            }
        }
    }
}
