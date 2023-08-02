using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using dotnet.Models;
using dotnet.Data;

namespace dotnet.Controllers;

public class PageController : Controller
{
    private readonly ILogger<PageController> _logger;
    private readonly AppDbContext _db;

    public PageController(ILogger<PageController> logger, AppDbContext db) {
        _logger = logger;
        _db = db;
    }

    public IActionResult Index() {
        IEnumerable<Page> pages = _db.Pages
            .Include(p => p.Elements)
            .ThenInclude(e => e.Styles);

        ViewData["Title"] = "Home";
        ViewData["PageProps"] = JsonConvert.SerializeObject(pages, new JsonSerializerSettings(){ 
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        });

        return View(pages);
    }
}
