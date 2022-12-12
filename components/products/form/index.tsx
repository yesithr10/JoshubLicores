import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import React, { FC } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

interface Inputs {
  code: string
  name: string
  quantity: number
  cost: number
  watertight_price: number
  cold_spot_price: number
}

interface Props {
  onRegister: () => void
}

const RegisterProductForm: FC<Props> = ({ onRegister }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
  const supabase = useSupabaseClient()

  const saveProduct = async (data: Inputs): Promise<void> => {
    await supabase.from('products').insert(data)
  }

  const {
    mutate,
    isLoading,
    error
  } = useMutation(saveProduct, { onSuccess: onRegister })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data)
  }

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:rounded-md">
          <div className="bg-white py-5 pb-0">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="code"
                       className="block text-sm font-medium text-gray-700">
                  Código
                </label>
                <input type="text"
                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                       id="code" {...register('code', { required: true })} />

                {(errors.code != null) &&
                  <span className="text-red-400 text-xs block py-1">Este campo es requerido</span>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="name"
                       className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input type="text"
                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                       id="name" {...register('name', { required: true })} />

                {(errors.name != null) &&
                  <span className="text-red-400 text-xs block py-1">Este campo es requerido</span>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="quantity"
                       className="block text-sm font-medium text-gray-700">
                  Cantidad
                </label>
                <input type="number"
                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                       id="quantity" {...register('quantity', { required: true })} />

                {(errors.quantity != null) &&
                  <span className="text-red-400 text-xs block py-1">Este campo es requerido</span>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="cost"
                       className="block text-sm font-medium text-gray-700">
                  Costo
                </label>
                <input type="number"
                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                       id="cost" {...register('cost', { required: true })} />

                {(errors.cost != null) &&
                  <span className="text-red-400 text-xs block py-1">Este campo es requerido</span>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="watertight_price"
                       className="block text-sm font-medium text-gray-700">
                  Precio estanco
                </label>
                <input type="number"
                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                       id="watertight_price" {...register('watertight_price', { required: true })} />

                {(errors.watertight_price != null) &&
                  <span className="text-red-400 text-xs block py-1">Este campo es requerido</span>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="cold_spot_price"
                       className="block text-sm font-medium text-gray-700">
                  Precio punto frio
                </label>
                <input type="number"
                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                       id="cold_spot_price" {...register('cold_spot_price', { required: true })} />

                {(errors.cold_spot_price != null) &&
                  <span className="text-red-400 text-xs block py-1">Este campo es requerido</span>}
              </div>

              <div className="py-3">
                <button type="submit"
                        disabled={isLoading}
                        className="inline-flex justify-center rounded-full border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">
                  Guardar
                </button>
              </div>

              {(Boolean(error)) &&
                <div className="text-red-400 text-xs block py-1">
                  Error al guardar el producto
                </div>}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterProductForm
