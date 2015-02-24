varying vec3 lightVec;
varying vec3 eyeVec;
varying vec3 normalVec;
varying vec2 texCoord;

uniform sampler2D colorMap;
uniform sampler2D normalMap;
uniform sampler2D specularMap;
uniform sampler2D spot;

void main (void)
{
    vec3 lVec = normalize(lightVec);
	vec3 vVec = normalize(eyeVec);
	vec4 base = texture2D(colorMap, texCoord);
    
    //noromal mapping
	vec3 bump = normalize( texture2D(normalMap, texCoord).xyz * 2.0 - 1.0);
    
    //ambient
	vec4 vAmbient = gl_LightSource[0].ambient * gl_FrontMaterial.ambient;

    //spotlight
    vec4 G = abs(texture2DProj(spot, gl_TexCoord[3]));
    
    //diffuse
	float diffuse = max( dot(lVec, bump), 0.0 );
    vec4 vDiffuse = gl_LightSource[0].diffuse * gl_FrontMaterial.diffuse * diffuse;	

    //specular
    float specular = pow(clamp(dot(reflect(-lVec, bump), vVec), 0.0, 1.0), 8.0);
    vec4 specColor = texture2D(specularMap, texCoord);
    vec4 vSpecular = gl_LightSource[0].specular * specColor * specular;
    
    //G problem?
	gl_FragColor = vec4((vDiffuse * base + vSpecular).rgb * G.rgb,1.0);
}