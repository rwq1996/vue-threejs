export default function Base(){
    const setPosition = (instance,x,y,z)=> {
        instance.position.set(x,y,z)
    }
    const setRotation = (instance,x,y,z) => {
        instance.rotation.x = x
        instance.rotation.y = y
        instance.rotation.z = z
    }
    return {setPosition,setRotation}
}