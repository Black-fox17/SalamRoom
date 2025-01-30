import torch
from PIL import Image
import numpy as np
import requests
from transformers import DPTImageProcessor, DPTForDepthEstimation

# Load model and processor
image_processor = DPTImageProcessor.from_pretrained("Intel/dpt-hybrid-midas")
model = DPTForDepthEstimation.from_pretrained("Intel/dpt-hybrid-midas", low_cpu_mem_usage=True).eval()

# Move model to GPU if available
device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)

# Load image

image = Image.open("roomimg.webp")

# Prepare input
inputs = image_processor(images=image, return_tensors="pt").to(device)

# Predict depth
with torch.no_grad():
    outputs = model(**inputs)
    predicted_depth = outputs.predicted_depth

# Resize depth map to match original image
prediction = torch.nn.functional.interpolate(
    predicted_depth.unsqueeze(1),
    size=image.size[::-1],
    mode="bicubic",
    align_corners=False,
)

# Normalize and save depth map
output = prediction.squeeze().cpu().numpy()
depth_map = (output - output.min()) / (output.max() - output.min())  # Normalize to 0-1
depth_image = (depth_map * 255).astype(np.uint8)  # Convert to 0-255
depth_pil = Image.fromarray(depth_image)

# Save depth image
depth_pil.save("depth_map.jpg")
depth_pil.show()
