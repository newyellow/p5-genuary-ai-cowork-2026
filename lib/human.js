// Human class for drawing and animating human figures
// Supports different head shapes and joint rotations

class Human {
  constructor(x, y, options = {}) {
    this.x = x;
    this.y = y;

    // Size parameters
    this.scale = options.scale || 1.0;
    this.headSize = options.headSize || 30;
    this.bodyHeight = options.bodyHeight || 60;
    this.bodyWidth = options.bodyWidth || 20;
    this.limbLength = options.limbLength || 40;
    this.limbWidth = options.limbWidth || 8;

    // Head shape: 'circle', 'square', 'triangle', 'pentagon', 'hexagon', 'star'
    this.headShape = options.headShape || 'circle';

    // Joint rotations (in degrees)
    this.headRotation = options.headRotation || 0;
    this.bodyRotation = options.bodyRotation || 0;
    this.leftArmRotation = options.leftArmRotation || -30;
    this.rightArmRotation = options.rightArmRotation || 30;
    this.leftLegRotation = options.leftLegRotation || -10;
    this.rightLegRotation = options.rightLegRotation || 10;

    // Arm and leg positions (shoulder/hip offset from body center)
    this.shoulderOffset = options.shoulderOffset || 0.4;
    this.hipOffset = options.hipOffset || 0.3;

    // Colors
    this.headColor = options.headColor || color(255);
    this.bodyColor = options.bodyColor || color(200);
    this.limbColor = options.limbColor || color(180);

    // Stroke settings
    this.strokeWeight = options.strokeWeight || 2;
    this.strokeColor = options.strokeColor || color(0);
    this.useStroke = options.useStroke !== undefined ? options.useStroke : true;

    // Animation parameters
    this.originalY = y;
    this.bouncePhase = random(TWO_PI);
  }

  // Set joint rotation
  setRotation(joint, angle) {
    switch(joint) {
      case 'head': this.headRotation = angle; break;
      case 'body': this.bodyRotation = angle; break;
      case 'leftArm': this.leftArmRotation = angle; break;
      case 'rightArm': this.rightArmRotation = angle; break;
      case 'leftLeg': this.leftLegRotation = angle; break;
      case 'rightLeg': this.rightLegRotation = angle; break;
    }
  }

  // Get rotation of a joint
  getRotation(joint) {
    switch(joint) {
      case 'head': return this.headRotation;
      case 'body': return this.bodyRotation;
      case 'leftArm': return this.leftArmRotation;
      case 'rightArm': return this.rightArmRotation;
      case 'leftLeg': return this.leftLegRotation;
      case 'rightLeg': return this.rightLegRotation;
      default: return 0;
    }
  }

  // Update method for animation
  update() {
    // Override this in derived classes or use for animations
  }

  // Draw the complete human figure
  draw() {
    push();
    translate(this.x, this.y);
    scale(this.scale);

    // Apply body rotation
    rotate(radians(this.bodyRotation));

    // Draw legs (behind body)
    this.drawLegs();

    // Draw body
    this.drawBody();

    // Draw arms
    this.drawArms();

    // Draw head
    this.drawHead();

    pop();
  }

  // Draw head with different shapes
  drawHead() {
    push();

    // Head is at top of body
    let headY = -(this.bodyHeight / 2 + this.headSize / 2);
    translate(0, headY);
    rotate(radians(this.headRotation));

    if (this.useStroke) {
      stroke(this.strokeColor);
      strokeWeight(this.strokeWeight);
    } else {
      noStroke();
    }
    fill(this.headColor);

    switch(this.headShape) {
      case 'circle':
        circle(0, 0, this.headSize);
        break;

      case 'square':
        rectMode(CENTER);
        square(0, 0, this.headSize * 0.9);
        break;

      case 'triangle':
        this.drawTriangle(0, 0, this.headSize);
        break;

      case 'pentagon':
        this.drawPolygon(0, 0, this.headSize / 2, 5);
        break;

      case 'hexagon':
        this.drawPolygon(0, 0, this.headSize / 2, 6);
        break;

      case 'star':
        this.drawStar(0, 0, this.headSize / 2, this.headSize / 4, 5);
        break;

      default:
        circle(0, 0, this.headSize);
    }

    pop();
  }

  // Draw body (rectangle)
  drawBody() {
    if (this.useStroke) {
      stroke(this.strokeColor);
      strokeWeight(this.strokeWeight);
    } else {
      noStroke();
    }
    fill(this.bodyColor);

    rectMode(CENTER);
    rect(0, 0, this.bodyWidth, this.bodyHeight);
  }

  // Draw arms
  drawArms() {
    // Left arm
    this.drawLimb(
      -this.bodyWidth * this.shoulderOffset,
      -this.bodyHeight * 0.3,
      this.leftArmRotation,
      this.limbColor
    );

    // Right arm
    this.drawLimb(
      this.bodyWidth * this.shoulderOffset,
      -this.bodyHeight * 0.3,
      this.rightArmRotation,
      this.limbColor
    );
  }

  // Draw legs
  drawLegs() {
    // Left leg
    this.drawLimb(
      -this.bodyWidth * this.hipOffset,
      this.bodyHeight / 2,
      this.leftLegRotation,
      this.limbColor
    );

    // Right leg
    this.drawLimb(
      this.bodyWidth * this.hipOffset,
      this.bodyHeight / 2,
      this.rightLegRotation,
      this.limbColor
    );
  }

  // Draw a single limb (arm or leg)
  drawLimb(x, y, rotation, color) {
    push();
    translate(x, y);
    rotate(radians(rotation));

    if (this.useStroke) {
      stroke(this.strokeColor);
      strokeWeight(this.strokeWeight);
    } else {
      noStroke();
    }
    fill(color);

    rectMode(CORNER);
    rect(0, 0, this.limbWidth, this.limbLength);

    pop();
  }

  // Helper: Draw triangle
  drawTriangle(x, y, size) {
    let h = size * 0.866; // height of equilateral triangle
    beginShape();
    vertex(x, y - h/2);
    vertex(x - size/2, y + h/2);
    vertex(x + size/2, y + h/2);
    endShape(CLOSE);
  }

  // Helper: Draw regular polygon
  drawPolygon(x, y, radius, sides) {
    beginShape();
    for (let i = 0; i < sides; i++) {
      let angle = TWO_PI / sides * i - HALF_PI;
      let px = x + cos(angle) * radius;
      let py = y + sin(angle) * radius;
      vertex(px, py);
    }
    endShape(CLOSE);
  }

  // Helper: Draw star
  drawStar(x, y, radius1, radius2, points) {
    let angle = TWO_PI / points;
    let halfAngle = angle / 2;

    beginShape();
    for (let i = 0; i < points; i++) {
      let a = angle * i - HALF_PI;
      let sx = x + cos(a) * radius1;
      let sy = y + sin(a) * radius1;
      vertex(sx, sy);

      a += halfAngle;
      sx = x + cos(a) * radius2;
      sy = y + sin(a) * radius2;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  // Animation helper: subtle bounce
  bounce(amplitude = 5, speed = 1) {
    this.bouncePhase += 0.05 * speed;
    this.y = this.originalY + sin(this.bouncePhase) * amplitude;
  }

  // Animation helper: sway arms
  swayArms(amplitude = 15, speed = 1, phase = 0) {
    let t = frameCount * 0.02 * speed + phase;
    this.leftArmRotation = -30 + sin(t) * amplitude;
    this.rightArmRotation = 30 + sin(t + PI) * amplitude;
  }

  // Animation helper: walk cycle
  walk(amplitude = 20, speed = 1, phase = 0) {
    let t = frameCount * 0.05 * speed + phase;

    // Legs move opposite to each other
    this.leftLegRotation = sin(t) * amplitude;
    this.rightLegRotation = sin(t + PI) * amplitude;

    // Arms move opposite to legs
    this.leftArmRotation = -30 + sin(t + PI) * amplitude * 0.5;
    this.rightArmRotation = 30 + sin(t) * amplitude * 0.5;

    // Subtle bounce
    this.bounce(3, speed);
  }

  // Check if point is inside human bounds (for interaction)
  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    let totalHeight = this.bodyHeight + this.headSize + this.limbLength;
    return d < totalHeight * this.scale / 2;
  }
}
