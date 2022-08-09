import Swal from "sweetalert2";
export const modalDelete = (request: () => Promise<"success" | "error">) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await request();

      if (res === "success") return Swal.fire("Deleted!", "Has been deleted.", "success");

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  });
};

export const errorModal = () => Swal.fire("Problem with server?", "Sorry for problems", "error");

export const successModal = () => Swal.fire("Success", "nice", "success");
