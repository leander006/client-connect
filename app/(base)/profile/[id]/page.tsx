import ProfileComponent from "@/components/ProfileComponent"
import axios from "axios"


async function page({
      params,
    }: {
      params: { id: Number};
    }) {
      const { id } = params;

      const {data} = await axios.get(`${process.env.BASE_URL}/api/auth/client?id=${id}`)
  return (
      <div className="w-screen flex h-screen justify-center items-center">
            <ProfileComponent image={data?.image} id={data?.id} name={data?.name}/>
      </div>
  )
}

export default page