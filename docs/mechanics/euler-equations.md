# Euler equations

The Euler equations describe the motion of an **inviscid** fluid, one with no viscosity. They are the [Navier–Stokes equations](navier-stokes.md) with the friction term removed, and they are the foundation of aerodynamics, gas dynamics and the theory of shock waves.

!!! abstract "In one sentence"
    A fluid parcel accelerates only because of pressure differences and body forces such as gravity; there is no friction.

Published by Leonhard Euler in 1757, they were among the first partial differential equations written down for a physical system.

## When viscosity can be ignored

Viscous effects scale as $1/Re$, so the Euler equations are a good model when the Reynolds number is large, away from solid walls:

- airflow around a wing, outside the thin boundary layer
- shock waves and explosions
- sound waves
- large-scale atmospheric and ocean flows (with rotation added)

Near walls they fail: real fluids stick to surfaces (no-slip), and a thin **boundary layer** forms where viscosity always matters.

## Incompressible form

For constant density $\rho$:

$$
\rho \left( \frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u} \cdot \nabla)\, \mathbf{u} \right) = -\nabla p + \mathbf{f}
$$

$$
\nabla \cdot \mathbf{u} = 0
$$

Compare with Navier–Stokes: the viscous term $\mu \nabla^2 \mathbf{u}$ is gone. That lowers the order of the equation from second to first in space, which changes which boundary conditions can be imposed (see [below](#boundary-conditions)).

## Compressible form

For gases at high speed, density, momentum and energy all change. Written in **conservation form** without body forces:

$$
\frac{\partial \rho}{\partial t} + \nabla \cdot (\rho \mathbf{u}) = 0
$$

$$
\frac{\partial (\rho \mathbf{u})}{\partial t} + \nabla \cdot \left( \rho\, \mathbf{u} \otimes \mathbf{u} + p \mathbf{I} \right) = 0
$$

$$
\frac{\partial E}{\partial t} + \nabla \cdot \big( (E + p)\, \mathbf{u} \big) = 0
$$

where $E = \rho e + \tfrac{1}{2} \rho |\mathbf{u}|^2$ is the total energy per unit volume and $e$ the internal energy per unit mass. For an ideal gas the system is closed by

$$
p = (\gamma - 1)\, \rho e
$$

with $\gamma = c_p / c_v$ ($\gamma \approx 1.4$ for air).

| Symbol | Meaning | SI unit |
|---|---|---|
| $\rho$ | density | kg/m³ |
| $\mathbf{u}$ | velocity | m/s |
| $p$ | pressure | Pa |
| $E$ | total energy per unit volume | J/m³ |
| $e$ | internal energy per unit mass | J/kg |
| $\gamma$ | ratio of specific heats | – |

### One-dimensional form

In 1D the whole system fits in one line, $\partial_t \mathbf{U} + \partial_x \mathbf{F}(\mathbf{U}) = 0$, with

$$
\mathbf{U} = \begin{pmatrix} \rho \\ \rho u \\ E \end{pmatrix},
\qquad
\mathbf{F} = \begin{pmatrix} \rho u \\ \rho u^2 + p \\ (E + p)\, u \end{pmatrix}
$$

This is the standard test bed for numerical methods.

## Waves and shocks

The compressible Euler equations are **hyperbolic**: information travels at finite speeds. In 1D those speeds are

$$
u - c, \qquad u, \qquad u + c, \qquad \text{with } c = \sqrt{\frac{\gamma p}{\rho}}
$$

the speed of sound. Two consequences:

- **Mach number** $M = |\mathbf{u}| / c$ decides the character of the flow. For $M < 1$ (subsonic) disturbances travel upstream; for $M > 1$ (supersonic) they cannot.
- **Shock waves:** smooth solutions can steepen into discontinuities in finite time. Across a shock the equations hold in integral form, giving the **Rankine–Hugoniot** jump conditions.

For a moving shock with speed $s$, they state that the flux jump equals $s$ times the jump in conserved quantities:

$$
\mathbf{F}(\mathbf{U}_R) - \mathbf{F}(\mathbf{U}_L) = s \left( \mathbf{U}_R - \mathbf{U}_L \right)
$$

## Vorticity and circulation

Taking the curl of the incompressible equations (with a conservative body force) gives the **vorticity equation**, for $\boldsymbol{\omega} = \nabla \times \mathbf{u}$:

$$
\frac{D \boldsymbol{\omega}}{D t} = (\boldsymbol{\omega} \cdot \nabla)\, \mathbf{u}
$$

The right-hand side is **vortex stretching**: a vortex tube that is stretched spins faster, like a figure skater pulling in their arms. In 2D this term vanishes, and vorticity is simply carried along with the flow.

**Kelvin's circulation theorem:** for an inviscid fluid with conservative body forces and density depending only on pressure, the circulation around any closed loop moving with the fluid is constant:

$$
\frac{D \Gamma}{D t} = 0, \qquad \Gamma = \oint_C \mathbf{u} \cdot d\mathbf{l}
$$

So a flow that starts irrotational stays irrotational, which is what makes potential flow theory possible.

## Bernoulli's equation

Using the identity $(\mathbf{u} \cdot \nabla)\mathbf{u} = \nabla \left( \tfrac{1}{2} |\mathbf{u}|^2 \right) - \mathbf{u} \times \boldsymbol{\omega}$ and gravity $\mathbf{f} = -\rho g \hat{\mathbf{z}}$, the steady incompressible Euler equations give

$$
p + \tfrac{1}{2} \rho |\mathbf{u}|^2 + \rho g z = \text{constant along a streamline}
$$

If the flow is also irrotational ($\boldsymbol{\omega} = 0$), the constant is the same everywhere. Writing $\mathbf{u} = \nabla \phi$ then gives **potential flow**: $\nabla^2 \phi = 0$, a linear equation that can be solved with classical methods.

### Worked example: Torricelli's law

Water drains from a wide open tank through a small hole a depth $h$ below the surface. Apply Bernoulli between the surface (point 1) and the jet (point 2). Both are at atmospheric pressure, and the surface moves very slowly, $u_1 \approx 0$:

$$
p_\text{atm} + 0 + \rho g h = p_\text{atm} + \tfrac{1}{2} \rho u_2^2 + 0
$$

$$
u_2 = \sqrt{2 g h}
$$

The water leaves as fast as if it had fallen freely from the surface. For $h = 1\ \text{m}$, $u_2 \approx 4.4\ \text{m/s}$.

## Boundary conditions

Without viscosity, only the **no-penetration** condition can be imposed at a solid wall:

$$
\mathbf{u} \cdot \mathbf{n} = 0
$$

The fluid may slip freely along the surface. This is the root of the gap between ideal and real flows.

!!! warning "d'Alembert's paradox (1752)"
    For steady, incompressible, irrotational flow around any body, the Euler equations predict **zero drag**. Real bodies obviously feel drag. The paradox was resolved by Prandtl in 1904: a thin viscous boundary layer always forms at the wall, and it can separate from the body, leaving a wake.

## Relation to Navier–Stokes

| | Euler | Navier–Stokes |
|---|---|---|
| Viscosity | none | included |
| Order in space | first | second |
| Wall condition | no-penetration, $\mathbf{u} \cdot \mathbf{n} = 0$ | no-slip, $\mathbf{u} = \mathbf{u}_\text{wall}$ |
| Shocks | sharp discontinuities | thin but smooth layers |
| Drag on bodies | zero (in potential flow) | realistic |
| Typical use | aerodynamics far from walls, gas dynamics, acoustics | everything, especially near walls and in turbulence |

## Solving them numerically

Because solutions can contain shocks, numerical methods must handle discontinuities without spurious oscillations:

- **Finite volume methods** in conservation form, so that shocks move at the correct speed.
- **Godunov's method** and approximate **Riemann solvers** (Roe, HLL, HLLC) to compute fluxes between cells.
- **High-resolution schemes** (MUSCL, WENO) with limiters for sharp shocks and accurate smooth regions.
- Classic test case: the **Sod shock tube**, a 1D Riemann problem with a shock, a contact discontinuity and a rarefaction wave.

## Open questions

!!! question "Do smooth solutions break down?"
    For the 3D incompressible Euler equations it is a long-standing question whether smooth initial data can develop a singularity in finite time. Significant progress has come recently: Elgindi (2019) showed blow-up for solutions with limited smoothness, and Chen and Hou (2022) gave a computer-assisted proof of blow-up for smooth data in a domain with a boundary. The case of smooth data in all of space without a boundary remains open.

## Further reading

- G. K. Batchelor, *An Introduction to Fluid Dynamics*, Cambridge University Press, 1967.
- J. D. Anderson, *Modern Compressible Flow*, McGraw-Hill.
- E. F. Toro, *Riemann Solvers and Numerical Methods for Fluid Dynamics*, Springer.
- A. J. Majda and A. L. Bertozzi, *Vorticity and Incompressible Flow*, Cambridge University Press, 2002.
