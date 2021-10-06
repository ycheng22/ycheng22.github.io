---
title: 'Create xyz-axis for PyMol'
date: 2021-08-05
header:
#   image: "/images/foo-bar-identity.jpg"
#   caption: "A beautiful photo"
  teaser: "/images/20210805_blog_pymol/show_session.png"
categories:
  - blog
tags:
  - PyMol
  - PDB
# toc: true
# toc_label: "Contents"
# toc_icon: "cog"
classes: wide
---

Summary: When show protein unit cell in PyMol, I want to show xyz axis, but PyMol doesn't have this option. Here is a solution.

**Contents:**
- [Step 1: Create xyz axis file](#step-1-create-xyz-axis-file)
- [Step 2: Edit the xyz_move.pdb file in PyMol](#step-2-edit-the-xyz_movepdb-file-in-pymol)
- [Step 3: Show xyz-axis in PyMol](#step-3-show-xyz-axis-in-pymol)

Check this blog on [github](https://github.com/ycheng22/ycheng22.github.io/blob/master/_posts/2021-08-05-create_xyz_for_PyMol.md)

*The code and file are available [here](https://github.com/ycheng22/Show-xyz-axis-for-PyMol)

![name](/images/20210805_blog_pymol/preview.png)
fig 1: Preview of protein unit cell

<!-- <figure>
  <img src="/assets/images/20210805_blog_pymol/preview.png" alt="this is a placeholder image">
  <figcaption>fig 1: Preview of protein unit cell</figcaption>
</figure> -->

## Step 1: Create xyz axis file

The following MATLAB code is used to create xyz axis.

```MATLAB
%set origin point to (-10,-10,-10)
x=1:50;
a_axis = zeros(length(x),3);
a_axis(:,1) = x';
b_axis = zeros(length(x),3);
b_axis(:,2) = x';
c_axis = zeros(length(x),3);
c_axis(:,3) = x';
abc_axis=[a_axis; b_axis; c_axis];
abc_axis=abc_axis-10;

fl_ID_name="xyz_move.pdb";
fl_ID=fopen(fl_ID_name,'w');
for m=1:length(abc_axis)
    x=abc_axis(m,1);
    y=abc_axis(m,2);
    z=abc_axis(m,3);
    fprintf(fl_ID,'%4s%7d%3s                %8.3f%8.3f%8.3f%6.2f%6.2f\n',... %%%16 spaces
                'ATOM',m,'  H',x,y,z,1.0,0.05);
end
```

The axis' origin point is set to (-10, -10, -10) so that it won't overlap with the unit cell origin. Each axis has 50 points.


## Step 2: Edit the xyz_move.pdb file in PyMol

Open the xyz_move.pdb file in PyMol(fig 2):

![name](/images/20210805_blog_pymol/show_xyz.png)
fig 2: Show xyz_move.pdb in PyMol

**Select xyz axis**

Type following command one by one in the command input area:

```
select a, id 1-50 # x-axis

select b, id 51-100 # y-axis

select c, id 101-150 #z-axis
```

*Learn PyMol command at [here](https://pymolwiki.org/index.php/Selection_Algebra)


Now it looks like this:

![name](/images/20210805_blog_pymol/select_abc.png)
fig 3: Select xyz axis in PyMol

**Color xyz axis**

Look at the red block in fig 4, for the selected
- a, click C, then choose red -> red
- b, click C, then choose green -> greem
- c, click C, then choose blue -> blue

![name](/images/20210805_blog_pymol/color_abc1.png)

![name](/images/20210805_blog_pymol/a_red.png)

fig 4: Color xyz axis

Now xyz axis has been colored with red, green, blue respectively.

**Label xyz**

Right click the last atom at x-axis, menu -> edit label (upper figure in fig 5). In the middle figure, at right lower corner, choose label size: 36,
at left upper corner, input capital x, enter.

Same for the y, z axis.

The result is in the lower figure.

![name](/images/20210805_blog_pymol/label_1.png)

![name](/images/20210805_blog_pymol/label_2.png)

![name](/images/20210805_blog_pymol/label_3.png)
fig 5: Label xyz axis

Click File -> Save Session, named `xyz_move_colored.pse`.

## Step 3: Show xyz-axis in PyMol

Open the saved session, choose "Merge with current session", now you will see fig 6.

![name](/images/20210805_blog_pymol/show_session.png)
fig 6: Show xyz axis in PyMol
