using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Helpers
{
    public static class PrepDB
    {
        public static void PrepPopulation(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                SeedData(serviceScope.ServiceProvider.GetService<MS_DbContext>());
            }
        }
        public static void SeedData(MS_DbContext context)
        {
            System.Console.WriteLine("Applying Migrations...");

            context.Database.Migrate();

            if (!context.Service.Any() && !context.Product.Any())
            {
                System.Console.WriteLine("Adding data - seeding...");
                context.Product.AddRange(
                    new Models.Product
                    {
                        Title = "Pack of 5 Ultra Magical Organic Henna",
                        Description = "Ultra Magical Organic Henna is 100% Pure, Natural & Chemical free. It is handmade with all natural ingredients including Triple Sifted Sojat Rajasthani henna powder, sugar, essential oils etc.\r\n\r\n✅ Ultra-fine Tip Size: 0.38mm\r\n✅ Weight: 25 gram\r\n✅ Length: 5-6 inches",
                        Price = 10,
                        Picturelink = "https://res.cloudinary.com/don6c7ggw/image/upload/v1708369497/ae9geent75nppwk62f8y.png"
                    },
                    new Models.Product
                    {
                        Title = "1 Ultra Magical Organic Henna",
                        Description = "Ultra Magical Organic Henna is 100% Pure, Natural & Chemical free. It is handmade with all natural ingredients including Triple Sifted Sojat Rajasthani henna powder, sugar, essential oils etc.\r\n\r\n✅ Ultra-fine Tip Size: 0.38mm\r\n✅ Weight: 25 gram\r\n✅ Length: 5-6 inches",
                        Price = 2,
                        Picturelink = "https://res.cloudinary.com/don6c7ggw/image/upload/v1708369497/talbxhcc6yxwujde2kj4.png"
                    },
                    new Models.Product
                    {
                        Title = "Henna Aftercare Sealant Spray",
                        Description = "Henna Aftercare Sealant Spray is an ideal aftercare solution to seal your dried henna design onto the skin and darken your henna stain like never before. It is exquisitely formulated with lemon, sugar, rose water and essential oils.",
                        Price = 5,
                        Picturelink = "https://res.cloudinary.com/don6c7ggw/image/upload/v1708369496/wk0mgpzmbcaefkpinzrs.jpg"
                    },
                    new Models.Product
                    {
                        Title = "Henna Aftercare Oil",
                        Description = "Henna Aftercare Oil is delicately made with love by using 100% pure & natural essential Oils, which give a new life to your fresh henna stain, while create a barrier between skin & water.\r\n\r\nHow to use Henna Aftercare Oil?\r\n\r\nApply the Mehndi Aftercare Oil 10 minutes before henna removal, then scrap off your henna paste. Leave the oil on the skin, keep applying it frequently for the next 24 hours.",
                        Price = 4,
                        Picturelink = "https://res.cloudinary.com/don6c7ggw/image/upload/v1708369496/q6atouqkkc3bc1ypvach.jpg"
                    }
                    );
                context.Service.AddRange(
                    new Models.Service()
                    {
                        Title = "Small Henna Tattoo 1 Hand 1 Side",
                        Description = "",
                        Price = 7,
                        Type = "Henna"
                    },
                    new Models.Service()
                    {
                        Title = "Small Henna Tattoo 2 Hand 1 Side",
                        Description = "",
                        Price = 15,
                        Type = "Henna"
                    },
                    new Models.Service()
                    {
                        Title = "Small Henna Tattoo 2 Hand 2 Side",
                        Description = "",
                        Price = 20,
                        Type = "Henna"
                    },
                    new Models.Service()
                    {
                        Title = "Big Henna Tattoo 2 Hands 2 Sides",
                        Description = "",
                        Price = 100,
                        Type = "Henna"
                    },
                    new Models.Service()
                    {
                        Title = "Small Henna Tattoo 1 foot 1 Side",
                        Description = "",
                        Price = 7,
                        Type = "Henna"
                    },
                    new Models.Service()
                    {
                        Title = "Small Henna Tattoo both feet 1 Sides",
                        Description = "",
                        Price = 15,
                        Type = "Henna"
                    },
                    new Models.Service()
                    {
                        Title = "Small Henna Tattoo both feet 2 Sides",
                        Description = "",
                        Price = 20,
                        Type = "Henna"
                    },
                    new Models.Service()
                    {
                        Title = "Any Size Henna Tattoo on both feets and legs",
                        Description = "",
                        Price = 100,
                        Type = "Henna"
                    },
                    new Models.Service()
                    {
                        Title = "Bride Henna Design Full Hand + Arms and Feet + Legs",
                        Description = "",
                        Price = 500,
                        Type = "Henna"
                    },
                    new Models.Service()
                    {
                        Title = "Eyebrow",
                        Description = "",
                        Price = 5,
                        Type = "Threading"
                    },
                    new Models.Service()
                    {
                        Title = "Upper lip",
                        Description = "",
                        Price = 4,
                        Type = "Threading"
                    },
                    new Models.Service()
                    {
                        Title = "Eyebrow and Upper lip",
                        Description = "",
                        Price = 8,
                        Type = "Threading"
                    },
                    new Models.Service()
                    {
                        Title = "Lower Lip",
                        Description = "",
                        Price = 2,
                        Type = "Threading"
                    },
                    new Models.Service()
                    {
                        Title = "Forehead",
                        Description = "",
                        Price = 4,
                        Type = "Threading"
                    },
                    new Models.Service()
                    {
                        Title = "Chin",
                        Description = "",
                        Price = 4,
                        Type = "Threading"
                    },
                    new Models.Service()
                    {
                        Title = "Neck",
                        Description = "",
                        Price = 4,
                        Type = "Threading"
                    },
                    new Models.Service()
                    {
                        Title = "Sides",
                        Description = "",
                        Price = 7,
                        Type = "Threading"
                    },
                    new Models.Service()
                    {
                        Title = "Beard Line",
                        Description = "",
                        Price = 10,
                        Type = "Threading"
                    },
                    new Models.Service()
                    {
                        Title = "Full Face (excluding eyebrows)",
                        Description = "£25 if bought sepePricely, save £5",
                        Price = 20,
                        Type = "Threading"
                    },
                    new Models.Service()
                    {
                        Title = "Full Face (including eyebrows)",
                        Description = "£30 if bought sepePricely, save £6",
                        Price = 24,
                        Type = "Threading"
                    },
                    new Models.Service()
                    {
                        Title = "Eyebrow",
                        Description = "",
                        Price = 7,
                        Type = "Waxing"
                    },
                    new Models.Service()
                    {
                        Title = "Upper lip",
                        Description = "",
                        Price = 5,
                        Type = "Waxing"
                    },
                    new Models.Service()
                    {
                        Title = "Eyebrow and Upper lip",
                        Description = "",
                        Price = 9,
                        Type = "Waxing"
                    },
                    new Models.Service()
                    {
                        Title = "Lower Lip",
                        Description = "",
                        Price = 3,
                        Type = "Waxing"
                    }, 
                    new Models.Service()
                    {
                        Title = "Forehead",
                        Description = "",
                        Price = 5,
                        Type = "Waxing"
                    },
                    new Models.Service()
                    {
                        Title = "Chin",
                        Description = "",
                        Price = 5,
                        Type = "Waxing"
                    },
                    new Models.Service()
                    {
                        Title = "Neck",
                        Description = "",
                        Price = 5,
                        Type = "Waxing"
                    },
                    new Models.Service()
                    {
                        Title = "Sides",
                        Description = "",
                        Price = 8,
                        Type = "Waxing"
                    },
                    new Models.Service()
                    {
                        Title = "Full Face (excluding eyebrows)",
                        Description = "£31 if bought sepePricely, save £10",
                        Price = 21,
                        Type = "Waxing"
                    },
                    new Models.Service()
                    {
                        Title = "Full Face (including eyebrows)",
                        Description = "£38 if bought sepePricely, save £12",
                        Price = 24,
                        Type = "Waxing"
                    },
                    new Models.Service()
                    {
                        Title = "Eyebrow",
                        Description = "",
                        Price = 8,
                        Type = "Tinting"
                    },
                    new Models.Service()
                    {
                        Title = "Lash",
                        Description = "",
                        Price = 12,
                        Type = "Tinting"
                    },
                    new Models.Service()
                    {
                        Title = "Lash and brow",
                        Description = "",
                        Price = 18,
                        Type = "Tinting"
                    },
                    new Models.Service()
                    {
                        Title = "Thread and tint",
                        Description = "",
                        Price = 12,
                        Type = "Tinting"
                    },
                    new Models.Service()
                    {
                        Title = "Strip lash application",
                        Description = "Express Lash Extension available(Speak to therapist for further detail)",
                        Price = 5,
                        Type = "Lashes"
                    }
                );
                context.SaveChanges();
            }
            else
            {
                System.Console.WriteLine("Already have data - not seeding");
            }
        }
    }

}
