vec2 funny_sin( vec2 );
vec2 circle( vec2, float, vec2 );
float circle2( vec2, float, vec2 );
float sin2( vec2, vec2, vec2 );

bool is_in_pixel( vec2, vec2 , vec2 );
bool is_in_pixel_AA( vec2 pixel_dims, vec2 uv, vec2 p, out float );
float AA( vec2, float );

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;
    vec2 pixel_dims = vec2(1.,1.)/iResolution.xy/vec2(.1,.1);
    
    vec3 col = vec3(1);
    float aa = 0.0;
    
    /*
    if ( is_in_pixel_AA( pixel_dims, uv, circle2(uv, 0.25, vec2(0.5,0.5) ) , aa ) ) {
        col = vec3(1.-aa);
    }
    */
    
    float func_approx = min(sin2(uv, vec2(iTime*0.2,0.5), vec2(.1, .1)),circle2(uv, 0.25, vec2(0.5+.25*sin(iTime), 0.5+.25*cos(iTime)) ));
    col = vec3( 1.0 - AA( pixel_dims, func_approx ) );
    
    fragColor = vec4(col,1.0);
}

float AA( vec2 pixel_dims, float dist )
{
    pixel_dims /= 2.;

    float aa_x = 1. - clamp(dist, 0., pixel_dims.x) / pixel_dims.x;
    float aa_y = 1. - clamp(dist, 0., pixel_dims.y) / pixel_dims.y;
    //return aa_x * aa_y;
    
    if ( aa_x * aa_y > 0.0 ) {
        return 1.0;
    }
    return 0.0;
}

vec2 circle( vec2 uv, float r, vec2 c )
{
    return vec2(uv.x,sqrt( pow(r,2.0) - pow(uv.x-c.x,2.0) ) + c.y );
}

// r^2 = x^2 + y2
float circle2( vec2 uv, float r, vec2 c )
{
    float lh = pow(r,2.0);
    float rh = pow(uv.x-c.x,2.0) + pow(uv.y-c.y,2.0);
    
    return abs(lh - rh);
}

// y = sin(x)
float sin2( vec2 uv, vec2 c, vec2 s )
{
    float lh = (uv.y - c.y)/ s.y ;
    float rh = sin((uv.x - c.x)/ s.x ) ;
    
    return abs(lh - rh);
}

vec2 funny_sin( vec2 uv )
{
    return vec2(uv.x,sin(uv.x*20.+iTime)*sin(uv.x*15.0*sin(iTime)+1.7778)*.1+.5);
}

bool is_in_pixel( vec2 pixel_dims, vec2 uv, vec2 p )
{
    pixel_dims /= 2.;
    vec2 x_lim = vec2( uv.x - pixel_dims.x, uv.x +  pixel_dims.x);
    vec2 y_lim = vec2( uv.y - pixel_dims.y, uv.y +  pixel_dims.y);
    
    return (x_lim.x < p.x && p.x < x_lim.y) && (y_lim.x < p.y && p.y < y_lim.y);
}

bool is_in_pixel_AA( vec2 pixel_dims, vec2 uv, vec2 p, out float aa )
{
    pixel_dims /= 2.;
    vec2 x_lim = vec2( uv.x - pixel_dims.x, uv.x +  pixel_dims.x);
    vec2 y_lim = vec2( uv.y - pixel_dims.y, uv.y +  pixel_dims.y);
    
    float aa_x = 1. - clamp(distance(uv.x,p.x), 0., pixel_dims.x) / pixel_dims.x;
    float aa_y = 1. - clamp(distance(uv.y,p.y), 0., pixel_dims.y) / pixel_dims.y;
    aa = aa_x * aa_y;
    
    return (x_lim.x < p.x && p.x < x_lim.y) && (y_lim.x < p.y && p.y < y_lim.y);
}