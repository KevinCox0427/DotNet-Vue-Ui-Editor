namespace dotnet.Data;

using Microsoft.EntityFrameworkCore;
using dotnet.Models;

public class AppDbContext : DbContext {
    protected readonly IConfiguration configuration;

    // Creating the context to make calls from the controllers to the db.
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // Creating the contexts for each of the models in the db.
    public virtual DbSet<Page> Pages { get; set; }
    public virtual DbSet<Element> Elements { get; set; }
    public virtual DbSet<Styles> Styles { get; set; }

    // Seeding the database.
    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<Page>().HasData(
            new Page { Id=1, Name="First Page" }
        );
        modelBuilder.Entity<Element>().HasData(
            new Element { Id=1, PageId=1, Name="El 1", MenuColor="#0f0e1a"},
            new Element { Id=2, PageId=1, Name="El 2", MenuColor="#790ad1"},
            new Element { Id=3, PageId=1, Name="El 3", MenuColor="#12b0c1"}
        );
        modelBuilder.Entity<Styles>().HasData(
            new Styles { Id=1, ElementId=1, Height=100, Width=150},
            new Styles { Id=2, ElementId=2, Height=75, Width=75},
            new Styles { Id=3, ElementId=3, Height=50, Width=50}
        );
    }
}
