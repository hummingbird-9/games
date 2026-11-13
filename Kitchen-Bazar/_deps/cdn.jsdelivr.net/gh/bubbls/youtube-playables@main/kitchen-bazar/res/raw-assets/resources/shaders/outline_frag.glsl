#ifdef GL_ES
    precision mediump float;
#endif

varying vec2 v_texCoord;
varying vec4 v_fragmentColor;

uniform vec3 u_outlineColor;
uniform float u_radius;
uniform float u_type;

void main()
{
	float radius = u_radius;
    vec4 normal = texture2D(CC_Texture0, v_texCoord);
    float multx = 0.35;
    float multh = 0.75;
    float alpha = normal.a * 8.0;

    alpha += texture2D(CC_Texture0, vec2(v_texCoord.x + radius, v_texCoord.y + radius)).a * multx;
    alpha += texture2D(CC_Texture0, vec2(v_texCoord.x + radius, v_texCoord.y)).a * multh;
    alpha += texture2D(CC_Texture0, vec2(v_texCoord.x + radius, v_texCoord.y - radius)).a * multx;
    alpha += texture2D(CC_Texture0, vec2(v_texCoord.x, v_texCoord.y - radius)).a * multh;
    alpha += texture2D(CC_Texture0, vec2(v_texCoord.x, v_texCoord.y + radius)).a * multh;
    alpha += texture2D(CC_Texture0, vec2(v_texCoord.x - radius, v_texCoord.y - radius)).a * multx;
    alpha += texture2D(CC_Texture0, vec2(v_texCoord.x - radius, v_texCoord.y)).a * multh;
    alpha += texture2D(CC_Texture0, vec2(v_texCoord.x - radius, v_texCoord.y + radius)).a * multx;

    vec4 outline =  vec4(u_outlineColor.rgb, alpha);

	if(u_type == 10.0)
	{
		gl_FragColor = normal;
	} else {
		// blend normal with new outline
		normal = ( outline * (1.0 - normal.a)) + (normal * normal.a);

		//if(normal.a == 0.0)
			//normal = vec4(1.0, 0.0, 0.0, 0.5);
		//gl_FragColor = normal;
		gl_FragColor = v_fragmentColor * normal;
	}
}