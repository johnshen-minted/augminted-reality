var World = {
  loaded: false,
  pages: [
    {
      name: "001",
      overlayPath: "assets/products/MIN-4A2-GNA_24x18.jpg"
    },
    {
      name: "002",
      overlayPath: "assets/products/MIN-88G-GNA_24x24.jpg"
    },
    {
      name: "003",
      overlayPath: "assets/products/MIN-F3B-GNA_24x18.jpg"
    },
    {
      name: "004",
      overlayPath: "assets/products/MIN-HCK-GNA_24X18.jpg"
    },
  ],

  init: function() {
    this.createTracker();
    this.createOverlays();
  },

  createTracker: function() {
    // init tracker
    this.tracker = new AR.ClientTracker("assets/markers2.wtc", {
      onLoaded: this.worldLoaded
    });
  },

  createOverlays: function() {
    for (var i = 0; i < this.pages.length; i++) {
      this.createPage(this.pages[i])
    }
  },

  createPage: function(pageObj) {
    var target = new AR.ImageResource(pageObj.overlayPath);
    // size defaults to 1
    var overlay = new AR.ImageDrawable(target, 1);
    var page = new AR.Trackable2DObject(this.tracker, pageObj.name, {
      drawables: {
        cam: overlay
      }
    });
  },

  worldLoaded: function() {
    document.getElementById('loadingMessage').innerHTML = "<div>Ready to Scan</div>";

    // Remove Scan target message after 10 sec.
    setTimeout(function() {
      var e = document.getElementById('loadingMessage');
      e.parentElement.removeChild(e);
    }, 10000);
  }
};

World.init();
