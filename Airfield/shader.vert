varying vec3 lightVec; 
varying vec3 eyeVec;
varying vec3 normalVec;
varying vec2 texCoord;
attribute vec3 vTangent; 
					 

void main(void)
{

    normalVec = gl_NormalMatrix * gl_Normal;

	vec3 n = normalize(gl_NormalMatrix * gl_Normal);
	vec3 t = normalize(gl_NormalMatrix * vTangent);
	vec3 b = normalize(cross(n, t));
	
	vec3 vVertex = vec3(gl_ModelViewMatrix * gl_Vertex);
    vec3 tmpVec = gl_LightSource[0].position.xyz;
    mat3 M = mat3(t,b,n);     

    lightVec = normalize(tmpVec) * M;
	tmpVec = -vVertex;
    eyeVec = tmpVec * M;
    
    gl_TexCoord[3] = gl_TextureMatrix[3] * gl_Vertex;
    
    texCoord = gl_MultiTexCoord0.xy;
    gl_Position = ftransform();
}
