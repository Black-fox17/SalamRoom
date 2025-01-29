import torch
import cv2
import numpy as np
import torchvision.transforms as transforms
from midas.model_loader import load_model

def estimate_depth(image_path):
    model_type = "DPT_Large"  # High-quality model
    model, transform, device = load_model(model_type)
    
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    input_image = transform(image).unsqueeze(0).to(device)
    
    with torch.no_grad():
        prediction = model(input_image)
        depth_map = prediction.squeeze().cpu().numpy()
    
    depth_map = (depth_map - depth_map.min()) / (depth_map.max() - depth_map.min())  # Normalize
    return depth_map

# Example usage
depth = estimate_depth("uploads/sample_room.jpg")
cv2.imwrite("uploads/depth_map.jpg", (depth * 255).astype(np.uint8))
