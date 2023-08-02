using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace dotnet.Models;

/**
 *   
 */
public class Page {
    [Key]
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; }

    public ICollection<Element> Elements { get; set; } = new List<Element>();
}

public class Element {
    [Key]
    public int Id { get; set; }

    [ForeignKey("Page")]
    public int PageId { get; set; }
    public Page Page { get; set; } = null!;

    [Required]
    public string Name { get; set; }
    [Required]
    public string MenuColor { get; set; }

    public ICollection<Styles> Styles { get; set; } = new List<Styles>();
}

public class Styles {
    [Key]
    public int Id { get; set; }
    
    [ForeignKey("Element")]
    public int ElementId { get; set; }
    public Element Element { get; set; } = null!;

    public int Height { get; set; }

    public int Width { get; set; }
}