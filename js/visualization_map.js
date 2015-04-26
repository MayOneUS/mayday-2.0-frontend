// voxel-map.js
function VoxelMap(params) {
  this.$el = params.$el;
  this.$key = this.$el.find('.key');
  this.$loading = this.$el.find('.loading');
  this.$popover = this.$el.find('.voxel-popover');
  this.$select = this.$el.find('select');
  this.$voxels = this.$el.find('.voxels');

  this.sendRequest(params.url);

  this.preloadImages([
    '/images/map/arrow-left.png',
    '/images/map/arrow-right.png',
  ]);
  this.createPrototypeVoxel();
  this.addActionListeners();
  this.addSelectListener();
  this.detectIE9();

  // Resize
  this.resizeTimeout = null;
  this.onResize = this.onResize.bind(this);
  this.addResizeListener();
}

VoxelMap.prototype.sizes = {
  width: 25,
  height: 26,
  left: 22,
  top: 24,
  popoverVerticalOffset: 42 + 24,
  popoverWidth: 309,
};

VoxelMap.prototype.updateSizeModifier = function() {
  this.sizes.overallWidth = this.$el.width();
  this.sizeModifier = ((this.sizes.overallWidth - 6) / this.columns) / this.sizes.left;

  var magicNumber = 4;
  this.sizeModifier *= magicNumber;
  this.sizeModifier = Math.floor(this.sizeModifier);
  this.sizeModifier /= magicNumber;

  this.$el.attr('size-modifier', this.sizeModifier);

  var occupiedWidth = Math.ceil(this.sizes.left * this.sizeModifier * this.columns) + 6;
  this.sizes.paddingLeft = (this.sizes.overallWidth - occupiedWidth) / 2;
};

VoxelMap.prototype.updateHeight = function() {
  this.$voxels.height((this.sizes.height * this.sizeModifier) * this.rows);
};

VoxelMap.prototype.onResize = function() {
  this.updateSizeModifier();
  this.updateHeight();

  // Resize voxels
  this.$el.find('.voxels .voxel').each(function(i, voxel) {
    var $voxel = $(voxel);
    var legislator = $voxel.data('legislator');

    var x = legislator.coordinates[0];
    var y = legislator.coordinates[1];
    $voxel.css({
      'left': (x * (this.sizes.left * this.sizeModifier)) + this.sizes.paddingLeft + 'px',
      'top': (y * (this.sizes.top * this.sizeModifier)) + 'px',
    });

    var $svg = $voxel.children('svg');
    $svg.css({
      'height': (this.sizes.height * this.sizeModifier) + 'px',
      'width': (this.sizes.width * this.sizeModifier) + 'px',
    });
  }.bind(this));

  // Move the popover
  var $voxel = this.$el.find('.voxel[dark]');
  if ($voxel.length > 0) {
    var left = +$voxel.css('left').match(/\d+/) + ((this.sizes.width * this.sizeModifier) / 2);

    var top = +$voxel.css('top').match(/\d+/) - (this.sizes.popoverVerticalOffset) + ((this.sizes.height * this.sizeModifier) / 2) - this.$popover.height();

    this.$popover.css({
      'display': 'block',
      'left': left + 'px',
      'top': top + 'px',
    });

    var right = left + this.sizes.popoverWidth;
    this.$popover.toggleClass('right', (this.sizes.popoverWidth < this.sizes.overallWidth && right > this.sizes.overallWidth));
  }

  // Move the labels
  this.$voxels.find('.label').each(function(i, label) {
    var $label = $(label);

    var coords = $label.data();

    $label.css({
      'left': (coords.x * (this.sizes.left * this.sizeModifier)) + this.sizes.paddingLeft + 'px',
      'top': (coords.y * (this.sizes.top * this.sizeModifier)) + 'px',
    });
  }.bind(this));
};

VoxelMap.prototype.addResizeListener = function() {
  $(window).on('resize', function() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(this.onResize, 128);
  }.bind(this));
};

VoxelMap.prototype.detectIE9 = function() {
  if (navigator.userAgent.match(/MSIE 9\./)) {
    this.$el.addClass('ie9');
  }
};

VoxelMap.prototype.preloadImages = function(urls) {
  urls.forEach(function(url) {
    var image = new Image();
    image.src = url;
  });
};

VoxelMap.prototype.sendRequest = function(url) {
  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);

  window.onLegislatorResponse = function(res) {
    this.labels = res.label_coordinates;
    this.legislators = res.tile_coordinates;

    // Determine width
    this.columns = 0;
    this.rows = 0;

    this.legislators.forEach(function(legislator, i) {
      if (this.columns < legislator.coordinates[0]) {
        this.columns = legislator.coordinates[0];
      }

      if (this.rows < legislator.coordinates[1]) {
        this.rows = legislator.coordinates[1];
      }
    }.bind(this));

    this.columns++;
    this.rows++;

    this.updateSizeModifier();
    this.updateHeight();

    // Create index of legislators, by coordinates
    this.legislatorsByCoords = [];
    this.legislators.forEach(function(legislator) {
      var x = legislator.coordinates[0];
      var y = legislator.coordinates[1];

      if (!this.legislatorsByCoords[x]) {
        this.legislatorsByCoords[x] = [];
      }

      this.legislatorsByCoords[x][y] = legislator;
    }.bind(this));

    // Create voxels
    this.legislators.forEach(function(legislator, i) {
      this.createVoxel({
        i: i,
        legislator: legislator,
      });
    }.bind(this));

    // Create state borders
    this.legislators.forEach(function(legislator, i) {
      this.createStateBorders({
        legislator: legislator,
      });
    }.bind(this));

    for (var label in this.labels) {
      this.createLabel({
        coordinates: this.labels[label],
        label: label,
      });
    }

    this.$key.css({
      opacity: 1
    });

    this.$loading.remove();

    this.$voxels.css({
      opacity: 1
    });
  }.bind(this);
};

VoxelMap.prototype.createLabel = function(params) {
  var $label = $('<div/>');
  $label.addClass('label');
  $label.text(params.label);

  var x = params.coordinates[0];
  var y = params.coordinates[1];
  $label.css({
    'left': (x * (this.sizes.left * this.sizeModifier)) + this.sizes.paddingLeft + 'px',
    'top': (y * (this.sizes.top * this.sizeModifier)) + 'px',
    'z-index': 999999,
  });

  $label.data({
    x: params.coordinates[0],
    y: params.coordinates[1],
  });

  this.$voxels.append($label);
};

VoxelMap.prototype.createPrototypeVoxel = function() {
  var template = $('#template-voxel').html();

  this.$prototype = $('<div/>');
  this.$prototype.addClass('voxel');
  this.$prototype.html(template);
};

VoxelMap.prototype.createVoxel = function(params) {
  var legislator = params.legislator;
  var $voxel = this.$prototype.clone();

  var color;
  if (legislator.legislator.support_max) {
    color = 'green';
  } else {
    if (legislator.legislator.targeted) {
      color = 'blue';
    } else {
      color = 'gray';
    }
  }

  $voxel.attr('color', color);

  var delay = (params.i / this.legislators.length) + Math.random() * 0.4;
  var x = legislator.coordinates[0];
  var y = legislator.coordinates[1];
  $voxel.css({
    'animation-delay': delay.toFixed(3) + 's',
    'left': (x * (this.sizes.left * this.sizeModifier)) + this.sizes.paddingLeft + 'px',
    'top': (y * (this.sizes.top * this.sizeModifier)) + 'px',
    'z-index': (y * (this.columns - 1)) + ((this.columns - 1) - x),
  });

  $voxel.data('legislator', legislator);

  var $svg = $voxel.children('svg');
  $svg.css({
    'height': (this.sizes.height * this.sizeModifier) + 'px',
    'width': (this.sizes.width * this.sizeModifier) + 'px',
  });

  // Save reference
  legislator.$voxel = $voxel;

  // Add to DOM
  this.$voxels.append($voxel);
};

VoxelMap.prototype.createStateBorders = function(params) {
  var legislator = params.legislator;
  var $voxel = legislator.$voxel;
  var coords = legislator.coordinates;
  var state = legislator.map_key.split('-')[0];

  var voxelAbove = this.legislatorsByCoords[coords[0]][coords[1] - 1];
  if (
    voxelAbove
    &&
    voxelAbove.map_key.split('-')[0] !== state
  ) {
    $voxel.addClass('has-border-top');
    voxelAbove.$voxel.addClass('has-border-bottom')
  }

  if (this.legislatorsByCoords[coords[0] - 1]) {
    var voxelBeside = this.legislatorsByCoords[coords[0] - 1][coords[1]];
    if (
      voxelBeside
      &&
      voxelBeside.map_key.split('-')[0] !== state
    ) {
      $voxel.addClass('has-border-left');
      voxelBeside.$voxel.addClass('has-border-right');
    }
  }

  // Save reference
  legislator.$voxel = $voxel;

  // Add to DOM
  this.$voxels.append($voxel);
};

VoxelMap.prototype.addSelectListener = function() {
  // Reset
  this.$select.val('');

  this.$select.on('change', function(e) {
    var selectedBill = e.target.value;
    var selectedChamber = this.$el.find('option[value="' + selectedBill + '"]').attr('chamber');

    this.$voxels.find('.voxel').each(function(i, voxel) {
      var $voxel = $(voxel);
      var legislator = $voxel.data('legislator').legislator;

      var color;
      if (!selectedBill) {
        if (legislator.support_max) {
          color = 'green';
        } else {
          if (legislator.targeted) {
            color = 'blue';
          } else {
            color = 'gray';
          }
        }
      } else {
        if (legislator.sponsorships[selectedBill]) {
          color = 'green';
        } else {
          if (legislator.targeted) {
            color = 'blue';
          } else {
            color = 'gray';
          }
        }
      }

      if (
        selectedChamber !== 'both'
        &&
        selectedChamber !== legislator.chamber
      ) {
        color = 'white';
      }

      $voxel.attr('color', color);
    }.bind(this));
  }.bind(this));
};

VoxelMap.prototype.addActionListeners = function() {
  this.$voxels.on('click', '.voxel', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var $voxel = $(e.currentTarget);

    this.$voxels.find('.voxel[dark]').removeAttr('dark');
    $voxel.attr('dark', true);

    this.$popover.remove();

    var legislator = $voxel.data('legislator');
    this.$popover.find('.name').text(legislator.legislator.name);
    this.$popover.find('.description').text(legislator.legislator.description);
    this.$popover.find('.stateface').text(legislator.map_key).prop('class', 'stateface stateface-replace stateface-'+legislator.map_key.substring(0,2).toLowerCase());
    this.$popover.find('.code').text(legislator.map_key.replace(/SENIOR|JUNIOR/, 'SEN'));
    this.$popover.find('.title').text(legislator.legislator.title.replace(/Senator/, 'Sen.'));
    this.$popover.find('.button').attr('href', '/legislator/?bioguide_id=' + legislator.legislator.bioguide_id);

    this.$voxels.prepend(this.$popover);

    var $photo = this.$popover.find('.photo');
    if ($photo.attr('src') !== legislator.legislator.image_url) {
      $photo.attr('src', legislator.legislator.image_url);
      $photo.css('opacity', 0);
    }

    var left = +$voxel.css('left').match(/\d+/) + ((this.sizes.width * this.sizeModifier) / 2);

    var top = +$voxel.css('top').match(/\d+/) - (this.sizes.popoverVerticalOffset) + ((this.sizes.height * this.sizeModifier) / 2) - this.$popover.height();

    this.$popover.css({
      'display': 'block',
      'left': left + 'px',
      'top': top + 'px',
    });

    var right = left + this.sizes.popoverWidth;
    this.$popover.toggleClass('right', (this.sizes.popoverWidth < this.sizes.overallWidth && right > this.sizes.overallWidth));

    // // Debug
    // console.log("'" + legislator.map_key.split('-')[0] + "': " + JSON.stringify(legislator.coordinates) + ',');
  }.bind(this));

  this.$voxels.on('click', '.voxel-popover a', function(e) {
    e.stopPropagation();
  }.bind(this));

  this.$voxels.on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    this.$popover.hide();
    this.$voxels.find('.voxel[dark]').removeAttr('dark');
  }.bind(this));
};
