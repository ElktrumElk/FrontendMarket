import bpy
i = 100
while True:
    location = bpy.data.objects["eye.001"].location[0]
    bpy.data.objects["BézierCircle.004"].constraints["Transformation"].from_max_x = i + location