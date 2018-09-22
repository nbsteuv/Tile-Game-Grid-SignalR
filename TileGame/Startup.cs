using Autofac;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using TileGame.Business.Game;
using TileGame.Business.Game.HubContext;
using TileGame.Data;
using TileGame.Models;
using TileGame.Services;

namespace TileGame
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            builder.RegisterModule(new AutofacBindings());
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                //Password Settings
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
                options.Password.RequiredUniqueChars = 6;

                //Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromHours(1);
                options.Lockout.MaxFailedAccessAttempts = 3;
                options.Lockout.AllowedForNewUsers = true;

                //User settings
                options.User.RequireUniqueEmail = true;
            });

            services.ConfigureApplicationCookie(options =>
            {
                //Return 401 instead of redirecting to default login page
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = 401;

                    return Task.CompletedTask;
                };

                //Cookie settings
                options.Cookie.HttpOnly = true;
                options.Cookie.Expiration = TimeSpan.FromHours(1);
                options.LoginPath = "/Account/Login"; //Same as default path for now
                options.LogoutPath = "/Account/Logout"; //Same as default path for now
                options.AccessDeniedPath = "/Account/AccessDenied"; //Same as default path for now
                options.SlidingExpiration = true;
            });

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            // Add application services.
            services.AddTransient<IEmailSender, EmailSender>();

            services.AddMvc()
                .AddJsonOptions(option =>
                {
                    option.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddCors();

            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ApplicationDbContext applicationDbContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            applicationDbContext.Database.Migrate();

            app.Use(async (context, next) =>
            {
                await next();
                if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            })
            .UseHttpsRedirection()
            .UseDefaultFiles(new DefaultFilesOptions { DefaultFileNames = new List<string> { "index.html" } })
            .UseStaticFiles()
            .UseCookiePolicy();

            app.UseAuthentication();

            app.UseCors(builder =>
            {
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials();
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "api",
                    template: "api/{controller=Home}/{action=Index}/{id?}");
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseSignalR(routes =>
            {
                routes.MapHub<GameHub>("/hubs/game");
            });

            DbInitializer.Seed(app);
        }
    }
}
