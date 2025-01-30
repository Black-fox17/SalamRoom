import open3d as o3d
import numpy as np
import cv2

def depth_to_point_cloud(depth_map):
    h, w = depth_map.shape
    fx = fy = 500  # Focal length (adjust as needed)
    cx, cy = w // 2, h // 2  # Image center
    
    points = []
    for y in range(h):
        for x in range(w):
            z = depth_map[y, x] * 10  # Scale depth values
            if z > 0:
                X = (x - cx) * z / fx
                Y = (y - cy) * z / fy
                points.append((X, Y, z))
    
    pcd = o3d.geometry.PointCloud()
    pcd.points = o3d.utility.Vector3dVector(np.array(points))
    
    # Save or visualize
    o3d.io.write_point_cloud("room.ply", pcd)
    o3d.visualization.draw_geometries([pcd])

# Load depth map and generate 3D point cloud
depth_map = cv2.imread("depth_map.jpg", cv2.IMREAD_GRAYSCALE) / 255.0
depth_to_point_cloud(depth_map)
